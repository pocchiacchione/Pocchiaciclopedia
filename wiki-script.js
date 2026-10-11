// ══════════════════════════════════════════════════════
//  PAGINE
//  Ogni pagina è un file dentro pages/ (elenco in pages-index.js).
//  loader.js le scarica tutte e le passa a questo script in
//  window.__DEFAULT_PAGES, prima che il resto parta.
// ══════════════════════════════════════════════════════
const DEFAULT_PAGES = window.__DEFAULT_PAGES || {};

let pages = {};
let currentPage = "Main";
let currentTab = "read";
let db = null;
function isProtected(name) {
  return false; // Nessuna pagina è protetta
}

function loadPagesLocalOnly() {
  try {
    pages = { ...DEFAULT_PAGES };
    const saved = localStorage.getItem("pocchiaciclopedia_pages_v2");
    if (saved) {
      const parsed = JSON.parse(saved);
      for (const k in parsed) {
        pages[k] = parsed[k];
      }
    }
  } catch(e) {
    pages = { ...DEFAULT_PAGES };
  }
}

// Stack cronologia interna: array di nomi pagina
let navHistory = [];
let navPos = -1; // posizione corrente nello stack

function navigateTo(name, fromPopstate) {
  // I personaggi non hanno più una pagina propria: portano alla sezione
  // della pagina in cui si trova ora la loro scheda (vedi redirect-data.js).
  let anchor = null;
  if (typeof REDIRECTS !== 'undefined' && Object.prototype.hasOwnProperty.call(REDIRECTS, name)) {
    anchor = REDIRECTS[name].anchor || null;
    name = REDIRECTS[name].page;
  }
  currentPage = name;

  // Aggiorna cronologia interna solo se non stiamo tornando
  if (!fromPopstate) {
    // Tronca il futuro se siamo in mezzo alla cronologia
    navHistory = navHistory.slice(0, navPos + 1);
    // Non duplicare se è la stessa pagina
    if (navHistory[navHistory.length - 1] !== name) {
      navHistory.push(name);
      navPos = navHistory.length - 1;
    }
    // Aggiorna URL hash senza ricaricare la pagina
    try {
      history.pushState({ page: name, pos: navPos }, '', '#' + encodeURIComponent(name));
    } catch(e) {}
  }

  updateBackButton();
  renderPage(name);
  updateSidebar();
  window.scrollTo(0, 0);
  if (anchor) scrollToAnchor(anchor);
}

// Porta alla sezione indicata e la evidenzia per un attimo
function scrollToAnchor(id) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: 'start' });
    el.classList.add('bio-flash');
    setTimeout(() => el.classList.remove('bio-flash'), 1800);
  }, 30);
}

function goBack() {
  if (navPos > 0) {
    navPos--;
    const name = navHistory[navPos];
    currentPage = name;
    try {
      history.back(); // muovi il browser history
    } catch(e) {}
    updateBackButton();
    renderPage(name);
    updateSidebar();
    window.scrollTo(0, 0);
  }
}

function goForward() {
  if (navPos < navHistory.length - 1) {
    navPos++;
    const name = navHistory[navPos];
    currentPage = name;
    try {
      history.forward();
    } catch(e) {}
    updateBackButton();
    renderPage(name);
    updateSidebar();
    window.scrollTo(0, 0);
  }
}

function updateBackButton() {
  const btn = document.getElementById('btn-back');
  if (!btn) return;
  if (navPos > 0) {
    btn.style.display = '';
    const prev = navHistory[navPos - 1];
    btn.title = `Torna a: ${prev}`;
    btn.innerHTML = `← ${prev.length > 22 ? prev.substring(0, 20) + '…' : prev}`;
  } else {
    btn.style.display = 'none';
  }
}

// Intercetta il tasto indietro del browser
window.addEventListener('popstate', function(e) {
  if (e.state && e.state.page) {
    navPos = e.state.pos !== undefined ? e.state.pos : Math.max(0, navPos - 1);
    currentPage = e.state.page;
    updateBackButton();
    renderPage(e.state.page);
    updateSidebar();
    window.scrollTo(0, 0);
  }
});

function renderPage(name) {
  const article = document.getElementById("article-content");
  const page = pages[name];
  if (!page) {
    article.innerHTML = `
      <div class="wiki-notice" style="background:#fff3f3;border-left-color:#ba0000"><span class="ni">🔴</span><span>La pagina <b>"${name}"</b> non esiste ancora. Non esiste ancora.</span></div>
      <h1 class="page-title" style="color:#ba0000">${name}</h1>
      <div class="page-subtitle">Da Pocchiaciclopedia, l'enciclopedia (quasi) libera.</div>
      <div class="wiki-article-body">
        <p style="font-family:sans-serif;color:#54595d;font-size:13px">Questa pagina non esiste ancora.</p>
      </div>`;
    return;
  }

  if (page.content) {
    article.innerHTML = page.content;
    evidenziaPersonaggi(article);
    if (name === 'Main') setTimeout(creaPaginaDelGiorno, 0);
    else setTimeout(() => injectCitazioni(name), 0);
  } else {
    article.innerHTML = `
      <h1 class="page-title">${page.title}</h1>
      <div class="page-subtitle">Da Pocchiaciclopedia, l'enciclopedia (quasi) libera.</div>
      <div class="wiki-article-body">
        <p style="font-family:sans-serif;color:#54595d;font-size:13px">Pagina vuota.</p>
      </div>`;
  }

  document.title = `${page.title} — Pocchiaciclopedia`;
}

function updateSidebar() {
  const container = document.getElementById("sidebar-pages");
  container.innerHTML = "";
  for (const name in pages) {
    if (name === "Main") continue;
    const a = document.createElement("a");
    a.textContent = name;
    a.onclick = () => navigateTo(name);
    if (name === currentPage) a.className = "active-page";
    container.appendChild(a);
  }
}

// ══════════════════════════════════════════════════════
//  RICERCA - SISTEMATA
// ══════════════════════════════════════════════════════

let searchTimeout = null;
let currentSearchResults = [];

function initSearch() {
  const input = document.getElementById('search-input');
  const btn   = document.getElementById('search-btn');
  const box   = document.getElementById('search-results');
  if (!input || !btn || !box) return;

  // Chiudi dropdown cliccando fuori
  document.addEventListener('mousedown', function(e) {
    const bar = document.getElementById('wiki-search-bar');
    if (bar && !bar.contains(e.target)) {
      closeSearch();
    }
  });

  // Input con debounce per evitare ricerche a ogni tasto
  input.addEventListener('input', function() {
    const q = this.value.trim();
    if (searchTimeout) clearTimeout(searchTimeout);
    
    if (q.length < 2) { 
      closeSearch(); 
      return; 
    }
    
    searchTimeout = setTimeout(() => {
      showResults(q);
    }, 250);
  });

  // Gestione tasti freccia e invio
  input.addEventListener('keydown', function(e) {
    const q = this.value.trim();
    const items = [...box.querySelectorAll('.search-result-item')];
    const focused = box.querySelector('.search-result-item.focused');
    let idx = focused ? items.indexOf(focused) : -1;
    
    switch(e.key) {
      case 'Enter':
        e.preventDefault();
        if (!q) return;
        // Se c'è un elemento focalizzato, vai a quello
        if (focused) {
          focused.click();
          return;
        }
        // Altrimenti cerca la corrispondenza esatta
        const exact = Object.keys(pages).concat(typeof REDIRECTS !== 'undefined' ? Object.keys(REDIRECTS) : []).find(k => k.toLowerCase() === q.toLowerCase());
        if (exact) { goToResult(exact); return; }
        // O prendi il primo risultato
        if (items.length > 0) items[0].click();
        break;
        
      case 'Escape':
        e.preventDefault();
        closeSearch();
        input.blur();
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (items.length === 0) return;
        if (focused) focused.classList.remove('focused');
        idx = Math.min(idx + 1, items.length - 1);
        items[idx].classList.add('focused');
        items[idx].scrollIntoView({ block: 'nearest' });
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (items.length === 0) return;
        if (focused) focused.classList.remove('focused');
        idx = Math.max(idx - 1, 0);
        items[idx].classList.add('focused');
        items[idx].scrollIntoView({ block: 'nearest' });
        break;
    }
  });

  // Bottone di ricerca
  btn.addEventListener('click', function() {
    const q = input.value.trim();
    if (!q) { input.focus(); return; }
    const exact = Object.keys(pages).concat(typeof REDIRECTS !== 'undefined' ? Object.keys(REDIRECTS) : []).find(k => k.toLowerCase() === q.toLowerCase());
    if (exact) { goToResult(exact); return; }
    const first = box.querySelector('.search-result-item');
    if (first) first.click();
    else showResults(q);
  });
}

function showResults(q) {
  const box = document.getElementById('search-results');
  if (!box) return;
  
  const ql = q.toLowerCase();
  const results = [];

  for (const name in pages) {
    if (name === 'Main') continue;
    const page = pages[name];
    
    // Calcola punteggio di rilevanza
    let score = 0;
    let snippet = '';
    
    // Match esatto del titolo
    if (name.toLowerCase() === ql) score = 100;
    // Match inizia con
    else if (name.toLowerCase().startsWith(ql)) score = 80;
    // Match contiene nel titolo
    else if (name.toLowerCase().includes(ql)) score = 60;
    
    // Cerca nel contenuto (solo se necessario)
    if (score < 60 && page.content) {
      const tmp = document.createElement('div');
      tmp.innerHTML = page.content;
      const text = tmp.textContent || '';
      if (text.toLowerCase().includes(ql)) {
        score = 40;
        // Estrai snippet
        const idx = text.toLowerCase().indexOf(ql);
        const start = Math.max(0, idx - 50);
        const end = Math.min(text.length, idx + q.length + 70);
        snippet = (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
      }
    } else if (page.content && score >= 60) {
      // Se già match nel titolo, aggiungi snippet dal contenuto
      const tmp = document.createElement('div');
      tmp.innerHTML = page.content;
      const text = tmp.textContent || '';
      const idx = text.toLowerCase().indexOf(ql);
      if (idx !== -1) {
        const start = Math.max(0, idx - 50);
        const end = Math.min(text.length, idx + q.length + 70);
        snippet = (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
      }
    }
    
    if (score > 0) {
      results.push({ name, score, snippet });
    }
  }

  // Nomi che ora vivono dentro un'altra pagina (personaggi)
  if (typeof REDIRECTS !== 'undefined') {
    for (const rn in REDIRECTS) {
      const rl = rn.toLowerCase();
      const sc = rl === ql ? 100 : rl.startsWith(ql) ? 80 : rl.includes(ql) ? 60 : 0;
      if (sc > 0 && REDIRECTS[rn].anchor) results.push({ name: rn, score: sc, snippet: 'Scheda nella pagina: ' + REDIRECTS[rn].page });
    }
  }

  // Ordina per punteggio (decrescente)
  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, 10); // Mostra massimo 10 risultati

  if (!top.length) {
    box.innerHTML = `<div style="padding:10px 14px;font-family:'Source Sans 3',sans-serif;font-size:13px;color:#54595d;">🔍 Nessun risultato per <b>${escHtml(q)}</b></div>`;
    box.classList.add('open');
    return;
  }

  box.innerHTML = top.map(r => {
    const highlightedTitle = highlightMatch(r.name, q);
    return `<div class="search-result-item" data-page="${escAttr(r.name)}">
      <div class="sr-title">📄 ${highlightedTitle}</div>
      ${r.snippet ? '<div class="sr-snippet">' + escHtml(r.snippet) + '</div>' : ''}
    </div>`;
  }).join('');

  // Attach click handler con mousedown (più veloce e non fa perdere focus)
  box.querySelectorAll('.search-result-item').forEach(function(item) {
    item.addEventListener('mousedown', function(e) {
      e.preventDefault();
      const pageName = this.dataset.page;
      if (pageName) goToResult(pageName);
    });
  });

  box.classList.add('open');
}

function highlightMatch(text, q) {
  const ql = q.toLowerCase();
  const tl = text.toLowerCase();
  const idx = tl.indexOf(ql);
  if (idx === -1) return escHtml(text);
  return escHtml(text.slice(0, idx))
    + '<mark style="background:#fff3a3;color:#202122;border-radius:2px;padding:0 2px;">' + escHtml(text.slice(idx, idx + q.length)) + '</mark>'
    + escHtml(text.slice(idx + q.length));
}

function goToResult(name) {
  closeSearch();
  const cleanName = name.replace(/\\/g, '');
  navigateTo(cleanName);
}

function closeSearch() {
  const box = document.getElementById('search-results');
  const input = document.getElementById('search-input');
  if (box) { 
    box.classList.remove('open'); 
    box.innerHTML = ''; 
  }
  // Non cancellare il testo nell'input, solo chiudi il dropdown
  currentSearchResults = [];
  if (searchTimeout) clearTimeout(searchTimeout);
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function escAttr(s) {
  return String(s).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ══════════════════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════
//  PAGINA: LA SFIDA DI NESTOLA AL TOPISMO
// ══════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════
//  PAGINA: EBRAISMO — LA FEDE DELLA RAGIONE
// ══════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════
//  CITAZIONI DINAMICHE — "Citato in" per personaggi/stati
// ══════════════════════════════════════════════════════

function injectCitazioni(name) {
  const article = document.getElementById('article-content');
  if (!article) return;

  // Solo per pagine con infobox (stati e luoghi)
  if (!article.querySelector('.infobox')) return;

  // Raccogli tutte le pagine che linkano a questa
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp("navigateTo\\('" + escaped.replace(/'/g, "\\\\?'") + "'\\)");

  const citanti = [];
  for (const key in pages) {
    if (key === name || key === 'Main') continue;
    const html = pages[key].content;
    if (html && pattern.test(html) && !citanti.includes(key)) citanti.push(key);
  }

  if (citanti.length === 0) return;

  // Inserisci prima di .wiki-cats (o in fondo al body se non c'è)
  const cats = article.querySelector('.wiki-cats');
  const section = document.createElement('div');
  section.className = 'citato-in-section';
  section.innerHTML =
    '<div style="border-top:1px solid #a2a9b1;margin-top:24px;padding-top:10px;">' +
    '<div style="font-family:sans-serif;font-size:11.5px;font-weight:600;color:#54595d;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">&#128204; Citato in</div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:6px;">' +
    citanti.map(function(n, i) {
      window._citatiTmp = window._citatiTmp || [];
      window._citatiTmp.push(n);
      var idx = window._citatiTmp.length - 1;
      return '<a onclick="navigateTo(window._citatiTmp[' + idx + '])" ' +
             'style="font-family:sans-serif;font-size:12.5px;color:#0645ad;border:1px solid #a2a9b1;padding:2px 8px;background:#f8f9fa;cursor:pointer;">' +
             n + '</a>';
    }).join('') +
    '</div></div>';

  if (cats) {
    cats.parentNode.insertBefore(section, cats);
  } else {
    article.appendChild(section);
  }
}

function creaPaginaDelGiorno() {
    // La "pagina del giorno" è stata rimossa: al suo posto, nello stesso
    // riquadro, un annuncio cliccabile.
    const container = document.getElementById('daily-box-container');
    if (!container) return;

    container.innerHTML = `
        <div id="fine-box" onclick="avviaEliminazionePagina()" style="border:1px solid #000; background:#000; margin-bottom:20px; overflow:hidden; padding:36px 16px; display:flex; align-items:center; justify-content:center; min-height:108px; cursor:pointer;">
            <div style="font-family:'Press Start 2P', monospace; font-size:15px; line-height:2; color:#33ff33; text-align:center; letter-spacing:1px;">
                LA FINE DELLA<br>POCCHIACICLOPEDIA<span class="cmd-cursor">_</span>
            </div>
        </div>
    `;
}

// ── Sequenza "eliminazione pagina": griglia di quadrati neri al contrario
// (la pagina sparisce sotto i quadrati, invece dei quadrati che svelano la
// pagina come nel gate iniziale), poi un messaggio in stile terminale, poi
// reset completo dell'accesso.
function avviaEliminazionePagina() {
    if (document.getElementById('cover-grid')) return; // già in corso

    document.body.style.overflow = 'hidden';

    const cols = 12, rows = 8;
    const overlay = document.createElement('div');
    overlay.id = 'cover-grid';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '2147483000';
    overlay.style.display = 'grid';
    overlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    overlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    document.body.appendChild(overlay);

    const cells = [];
    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement('div');
        cell.style.background = '#000';
        cell.style.opacity = '0';
        cell.style.transition = 'opacity 0.35s ease';
        overlay.appendChild(cell);
        cells.push(cell);
    }

    // Ordine casuale di comparsa dei quadrati (al contrario del gate: qui compaiono, non spariscono)
    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    const delayStep = 18;
    cells.forEach((cell, index) => {
        setTimeout(() => { cell.style.opacity = '1'; }, index * delayStep);
    });

    setTimeout(() => {
        mostraTerminaleEliminazione(overlay);
    }, cells.length * delayStep + 400);
}

function mostraTerminaleEliminazione(overlay) {
    overlay.innerHTML = '';
    overlay.style.background = '#000';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.padding = '20px';

    const testo = document.createElement('div');
    testo.style.fontFamily = "'Press Start 2P', monospace";
    testo.style.fontSize = '14px';
    testo.style.lineHeight = '2';
    testo.style.color = '#33ff33';
    testo.style.textAlign = 'center';
    testo.style.maxWidth = '90vw';
    testo.innerHTML = '<span id="cmd-typed"></span><span class="cmd-cursor">_</span>';
    overlay.appendChild(testo);

    const typed = testo.querySelector('#cmd-typed');
    const righe = ["PAGINA ELIMINATA DALL'AMMINISTRAZIONE", "DR. A. S. "];
    let riga = 0, carattere = 0;

    function scrivi() {
        if (riga >= righe.length) {
            // Aggiunge la parte censurata, esattamente come nel login iniziale
            const censura = document.createElement('span');
            censura.className = 'censor-black';
            censura.textContent = 'Spisso';
            typed.appendChild(censura);

            // Dopo una pausa, reset completo: rimuove l'accesso salvato sul
            // dispositivo e ricarica il sito, richiedendo di nuovo la password
            setTimeout(() => {
                localStorage.removeItem('pocchia-unlocked');
                location.reload();
            }, 2600);
            return;
        }

        if (carattere === 0 && riga > 0) {
            typed.appendChild(document.createElement('br'));
        }

        typed.appendChild(document.createTextNode(righe[riga][carattere]));
        carattere++;

        if (carattere >= righe[riga].length) {
            riga++;
            carattere = 0;
        }

        setTimeout(scrivi, 45);
    }

    scrivi();
}

// ══════════════════════════════════════════════════════
//  GUERRA DELLE PIANTE CONTRO GLI ZOMBI 2
// ══════════════════════════════════════════════════════

loadPagesLocalOnly();
updateSidebar();
navigateTo('Main');
initSearch();

// ══════════════════════════════════════════════════════
//  TOOLTIP PERSONAGGI — mostra un'immagine passando il mouse
//  (o toccando su mobile) sopra un nome, senza dover creare una
//  pagina apposta solo per far vedere una faccia.
//
//  I nomi da riconoscere e le relative immagini si definiscono in
//  un file a parte, "personaggi-data.js", dentro l'oggetto globale
//  PERSONAGGI_IMG. Se quel file non è incluso nella pagina, questa
//  funzionalità semplicemente non fa nulla (nessun errore).
// ══════════════════════════════════════════════════════

let charTooltipEl = null;
let charTooltipPinned = false;

function getPersonaggiMap() {
  return (typeof PERSONAGGI_IMG !== 'undefined') ? PERSONAGGI_IMG : null;
}

// Cerca nel testo dell'articolo tutte le occorrenze dei nomi noti e le
// trasforma in span cliccabili/hoverabili. Non tocca link esistenti,
// script/style, né nomi già trasformati in precedenza.
function evidenziaPersonaggi(root) {
  const map = getPersonaggiMap();
  if (!map || !root) return;

  const nomi = Object.keys(map).filter(n => n && n.trim().length > 0);
  if (nomi.length === 0) return;

  // Ordina dal nome più lungo al più corto, così "Mario Rossi" viene
  // riconosciuto prima del semplice "Mario" contenuto al suo interno.
  nomi.sort((a, b) => b.length - a.length);
  const escaped = nomi.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp('(' + escaped.join('|') + ')', 'g');

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p) return NodeFilter.FILTER_REJECT;
      if (p.closest('.char-name, a, script, style, textarea, h1, .infobox-title')) return NodeFilter.FILTER_REJECT;
      regex.lastIndex = 0;
      if (!regex.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodiDaSostituire = [];
  let n;
  while ((n = walker.nextNode())) nodiDaSostituire.push(n);

  nodiDaSostituire.forEach(node => {
    const testo = node.nodeValue;
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    regex.lastIndex = 0;
    let m;
    while ((m = regex.exec(testo)) !== null) {
      if (m.index > lastIndex) frag.appendChild(document.createTextNode(testo.slice(lastIndex, m.index)));
      const span = document.createElement('span');
      span.className = 'char-name';
      span.tabIndex = 0;
      span.dataset.char = m[1];
      span.textContent = m[1];
      frag.appendChild(span);
      lastIndex = m.index + m[1].length;
    }
    if (lastIndex < testo.length) frag.appendChild(document.createTextNode(testo.slice(lastIndex)));
    node.parentNode.replaceChild(frag, node);
  });
}

function ensureCharTooltip() {
  if (charTooltipEl) return charTooltipEl;
  const el = document.createElement('div');
  el.id = 'char-tooltip';
  el.innerHTML = '<img alt="">' + '<div class="ct-name"></div>';
  document.body.appendChild(el);
  charTooltipEl = el;
  return el;
}

// Formati provati in ordine, quando quello scritto in personaggi-data.js
// non corrisponde al file realmente presente su disco (es. è stato
// caricato un .png ma il dato dice .jpg): così non serve tenere allineate
// a mano le estensioni.
const ESTENSIONI_IMG_FALLBACK = ["png", "jpg", "jpeg", "webp", "gif"];

function impostaImmagineConFallback(img, percorso) {
  const puntoIdx = percorso.lastIndexOf('.');
  const base = puntoIdx !== -1 ? percorso.slice(0, puntoIdx) : percorso;
  const estOriginale = puntoIdx !== -1 ? percorso.slice(puntoIdx + 1).toLowerCase() : "";

  // Prova prima l'estensione dichiarata, poi le altre note, senza ripeterla.
  const ordine = [estOriginale, ...ESTENSIONI_IMG_FALLBACK].filter((e, i, arr) => e && arr.indexOf(e) === i);
  let tentativo = 0;

  img.onerror = function () {
    tentativo++;
    if (tentativo < ordine.length) {
      img.src = base + '.' + ordine[tentativo];
    } else {
      img.onerror = null; // nessun formato ha funzionato, ci si ferma
    }
  };
  img.src = ordine.length ? (base + '.' + ordine[0]) : percorso;
}

function showCharTooltip(target, nome) {
  const map = getPersonaggiMap();
  if (!map || !map[nome]) return;
  const el = ensureCharTooltip();
  const img = el.querySelector('img');
  impostaImmagineConFallback(img, map[nome]);
  img.alt = nome;
  el.querySelector('.ct-name').textContent = nome;
  el.classList.add('visible');

  const rect = target.getBoundingClientRect();
  const tw = el.offsetWidth || 190;
  let left = rect.left + rect.width / 2 - tw / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
  let top = rect.top - el.offsetHeight - 10;
  if (top < 8) top = rect.bottom + 10;
  el.style.left = left + 'px';
  el.style.top = top + 'px';
}

function hideCharTooltip() {
  if (!charTooltipEl) return;
  charTooltipEl.classList.remove('visible');
  charTooltipPinned = false;
}

function initCharTooltipEvents() {
  const article = document.getElementById('wiki-article');
  if (!article) return;

  // Desktop: passaggio del mouse
  article.addEventListener('mouseover', function(e) {
    const span = e.target.closest('.char-name');
    if (span) showCharTooltip(span, span.dataset.char);
  });
  article.addEventListener('mouseout', function(e) {
    const span = e.target.closest('.char-name');
    if (span && !charTooltipPinned) hideCharTooltip();
  });

  // Tastiera (accessibilità)
  article.addEventListener('focusin', function(e) {
    const span = e.target.closest('.char-name');
    if (span) showCharTooltip(span, span.dataset.char);
  });
  article.addEventListener('focusout', function() {
    if (!charTooltipPinned) hideCharTooltip();
  });

  // Mobile/tocco: il click "fissa" il tooltip finché non si tocca altrove
  article.addEventListener('click', function(e) {
    const span = e.target.closest('.char-name');
    if (span) {
      e.preventDefault();
      charTooltipPinned = true;
      showCharTooltip(span, span.dataset.char);
    }
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.char-name') && !e.target.closest('#char-tooltip')) {
      hideCharTooltip();
    }
  });
}

initCharTooltipEvents();
