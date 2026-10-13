// Carica le pagine (una per file, dentro pages/) e poi avvia il sito.
// L'elenco delle pagine è in pages-index.js; wiki-script.js parte solo
// dopo che tutte le pagine sono state scaricate.
(function () {
  var box = document.getElementById('article-content');
  if (box) box.innerHTML = '<p style="font-family:sans-serif;color:#54595d;padding:20px">Caricamento delle pagine…</p>';

  Promise.all(PAGES_INDEX.map(function (e) {
    if (e.name === 'Main') {
      var tpl = document.getElementById('main-page');
      return Promise.resolve(tpl ? tpl.innerHTML : '');
    }
    if (!e.file) return Promise.resolve('');
    return fetch('pages/' + e.file).then(function (r) {
      if (!r.ok) throw new Error('pages/' + e.file + ' (' + r.status + ')');
      return r.text();
    });
  })).then(function (texts) {
    var pagine = {};
    PAGES_INDEX.forEach(function (e, i) {
      pagine[e.name] = { title: e.title, content: texts[i], wikitext: e.wikitext || '', history: [] };
    });
    window.__DEFAULT_PAGES = pagine;
    var s = document.createElement('script');
    s.src = 'wiki-script.js';
    document.body.appendChild(s);
  }).catch(function (err) {
    if (box) box.innerHTML = '<p style="font-family:sans-serif;color:#ba0000;padding:20px">Impossibile caricare le pagine: ' + err.message +
      '.<br>Se stai aprendo il file direttamente dal computer, usa un server locale o GitHub Pages.</p>';
  });
})();
