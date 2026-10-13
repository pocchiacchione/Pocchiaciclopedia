# Specifica delle pagine wiki

> **Destinatario: un'IA (o uno sviluppatore) che deve creare, modificare o validare pagine di questo tipo di wiki.**
> Questo documento descrive in modo normativo come deve essere fatta una pagina wiki, come si registra nel sito e come va scritto il testo.
> Ricavato dall'analisi di un repository di esempio (index.html, pages/*.html, wiki-script.js, wiki-style.css, personaggi-data.js).
> Le parole **DEVE / NON DEVE / DOVREBBE** hanno valore normativo: DEVE = obbligatorio perché il sito funzioni; DOVREBBE = convenzione di stile osservata.

---

## 1. Come funziona il sito (da sapere prima di scrivere)

- Il sito è una **SPA statica** (GitHub Pages). Esiste un solo documento HTML vero: `index.html`.
- Ogni pagina wiki **non è un documento HTML completo**: è un **frammento HTML** salvato in `pages/<slug>.html`. Lo script (`wiki-script.js`) lo scarica con `fetch` e lo inserisce con `innerHTML` dentro `<div id="article-content">`.
- L'elenco delle pagine esistenti vive in `index.html`, nell'oggetto JavaScript **`PAGE_INDEX`**. Una pagina che non è in `PAGE_INDEX` **non esiste** per il sito (sidebar, ricerca, navigazione, "Pagina del giorno").
- La navigazione NON usa `href`: usa `onclick="navigateTo('Nome Pagina')"`. Il nome è la **chiave** di `PAGE_INDEX`.
- All'avvio lo script precarica tutte le pagine (serve alla ricerca full-text, alla "Pagina del giorno" e alla sezione "Citato in").
- Funzionalità **automatiche** (NON vanno scritte a mano nel frammento):
  - **Tooltip personaggi**: i nomi presenti in `personaggi-data.js` (`PERSONAGGI_IMG`) diventano passabili col mouse/tocco e mostrano un'immagine.
  - **"Citato in"**: nelle pagine che contengono un `.infobox`, viene inserito prima delle categorie l'elenco delle pagine che le linkano.
  - **Pagina del giorno**: sulla pagina `Main`, nel contenitore `#daily-box-container`.
  - **Sidebar** (elenco di tutte le pagine, nell'ordine di `PAGE_INDEX`) e **ricerca** (titolo + testo).

### Struttura del repository

```
index.html              # shell del sito + PAGE_INDEX (elenco pagine)
wiki-script.js          # logica (navigazione, ricerca, tooltip, citazioni)
wiki-style.css          # stile (tutte le classi usate dalle pagine)
personaggi-data.js      # mappa nome -> immagine per i tooltip (PERSONAGGI_IMG)
pages/<slug>.html       # UN frammento per pagina (qui vive il contenuto)
pages/main.html         # pagina principale (chiave "Main")
img/pagine/             # immagini inserite negli articoli
img/personaggi/         # immagini dei tooltip
```

`le-origini.html` nella radice è una **copia legacy** non referenziata da `PAGE_INDEX`: NON usarla come modello e NON modificarla.

---

## 2. Anatomia obbligatoria di una pagina (frammento HTML)

Il file `pages/<slug>.html` DEVE contenere, **in quest'ordine**, solo questi blocchi:

1. `div.infobox` (opzionale, vedi §3)
2. `h1.page-title`
3. `div.page-subtitle`
4. `div.wiki-article-body` con tutto il testo
5. `div.wiki-cats` (categorie)

Il frammento **NON DEVE** contenere `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<link>` o `<script>` (gli script inseriti via `innerHTML` non vengono eseguiti). Encoding **UTF-8**, caratteri accentati scritti normalmente (non come entità).

### Template da copiare

```html
<div class="infobox">
<div class="infobox-title">TITOLO PAGINA</div>
<table>
<tr><td>Periodo</td><td>…</td></tr>
<tr><td>Luogo</td><td>…</td></tr>
<tr><td>Eventi principali</td><td>…</td></tr>
</table>
</div>

<h1 class="page-title">TITOLO PAGINA</h1>
<div class="page-subtitle">Da NOME WIKI, sottotitolo fisso della wiki.</div>

<div class="wiki-article-body">

<p>La <b>TITOLO PAGINA</b> è/ebbe … (frase introduttiva, vedi §5). Eventuale link alla pagina precedente: <a onclick="navigateTo('Nome Pagina Precedente')">Nome Pagina Precedente</a>.</p>

<h2>Prima sezione</h2>
<p>…</p>

<h2>Seconda sezione</h2>
<h3>Sottosezione</h3>
<p>…</p>

<p>La vicenda prosegue nella pagina <a onclick="navigateTo('Nome Pagina Successiva')">Nome Pagina Successiva</a>.</p>

</div>

<div class="wiki-cats">
<strong>Categorie:</strong>
<a onclick="navigateTo('Storia')">Storia</a>
<a onclick="navigateTo('Altra Categoria')">Altra Categoria</a>
</div>
```

### Regole sui singoli blocchi

| Blocco | Regola |
|---|---|
| `h1.page-title` | Testo **identico** al titolo della pagina (chiave di `PAGE_INDEX`, senza il suffisso "— NOME WIKI", che aggiunge lo script al `<title>`). Uno solo per pagina. |
| `div.page-subtitle` | Testo fisso, uguale in tutte le pagine della stessa wiki: `Da NOME WIKI, sottotitolo della wiki.` (la pagina `Main` può usare solo il sottotitolo). |
| `div.wiki-article-body` | Contiene **tutto** il testo. Dentro: `<p>`, `<h2>`, `<h3>`, `<ul>/<li>`, `<b>`, `<a>`, immagini. |
| `h2` | Sezioni principali. Nessun `h1` dentro il corpo. |
| `h3` | Sottosezioni di un `h2` (es. "Conseguenze" → h3 per ogni conseguenza). `h4` esiste nel CSS ma non è mai usato: evitarlo. |
| Elenchi | `<ul><li><b>Termine</b> — spiegazione.</li></ul>`. Il separatore è il trattino lungo "—" con spazi. |
| `div.wiki-cats` | Sempre presente in fondo. Struttura esatta del template. Non aggiungere stili inline. |

**Classi CSS esistenti ma attualmente non usate** (usarle solo se richiesto espressamente, rispettando la loro struttura): `.toc-box` (indice, con `.toc-title` e liste `<ol>`), `.stub-box` (avviso "abbozzo"), `.reflist` + `<sup><a>` (note), `.wiki-notice` (riquadro avviso con `<span class="ni">emoji</span><span>testo</span>`), `.clearfix`.

---

## 3. Infobox

- Presente nelle pagine di **eventi, periodi, guerre, regni, personaggi o stati**. **Assente** nella pagina `Main`.
- Posto **prima** dell'`h1` (il CSS lo posiziona a destra con `float:right`, larghezza 270px).
- `infobox-title` = titolo della pagina.
- Una tabella a **due colonne**: `<td>etichetta</td><td>valore</td>`. La prima cella è l'etichetta (grassetto automatico via CSS: non aggiungere `<b>`).
- Etichette osservate (riusarle, non inventarne di nuove senza motivo): `Periodo`, `Area` / `Luogo`, `Popoli` / `Regni` / `Regno`, `Sovrani` / `Sovrano` / `Comandanti`, `Schieramenti`, `Lingua`, `Esito`, `Eventi principali`.
- Nel valore, più elementi separati da virgola; per i comandanti indicare lo schieramento tra parentesi: `Leonard Pecktris (CutiCuti), T. Ciano (Pacci)`.
- La presenza dell'infobox attiva anche la sezione automatica **"Citato in"**.

---

## 4. Registrare la pagina in `PAGE_INDEX` (index.html)

Ogni nuova pagina richiede una voce nell'oggetto `PAGE_INDEX` dentro `index.html`:

```js
"Nome Pagina": {
  file: "pages/nome-pagina.html",
  title: "Nome Pagina",
  categorie: ["Storia", "Altra Categoria"]
},
```

- **Chiave** (`"Nome Pagina"`): è il nome canonico. DEVE coincidere **carattere per carattere** (maiuscole, trattini, spazi) con: il testo dell'`h1`, il valore di ogni `navigateTo('…')` che punta alla pagina, il `title`.
- **`file`**: percorso `pages/<slug>.html`. Lo `slug` si ottiene così (funzione `slugify` dello script): minuscolo → rimozione degli accenti → ogni sequenza di caratteri non `a-z0-9` diventa `-` → niente trattini a inizio/fine. Esempi: `Guerra CutiCuti-Pacci` → `guerra-cuticuti-pacci`; `La Fine del Regno Paccutiano` → `la-fine-del-regno-paccutiano`.
- **`title`**: di norma uguale alla chiave (solo `Main` ha un titolo diverso: `NOME WIKI — Pagina principale`).
- **`categorie`**: array di stringhe, DEVE riflettere gli stessi nomi dei link in `div.wiki-cats` della pagina, nello stesso ordine.
- **L'ordine delle voci** in `PAGE_INDEX` è l'ordine della sidebar: inserire le pagine in ordine **cronologico/narrativo**.
- **NON DEVONO** esserci apostrofi (`'`) o virgolette nel nome della pagina: romperebbero `navigateTo('…')` e la sezione "Citato in" (che cerca esattamente `navigateTo('Nome')` con apici singoli). Es.: usare `Unificazione Italiana`, non `Proclamazione dell'Unificazione`.
- Dopo l'ultima voce NON mettere la virgola finale; tra le voci sì.

---

## 5. Stile e scrittura del testo

### Voce e registro
- Tono **enciclopedico serio applicato a un universo parodistico/assurdo**: i fatti più bizzarri sono narrati con tono neutro, da Wikipedia, senza ammiccamenti.
- **Terza persona**, mai "io"/"tu"/"noi", niente rivolgersi al lettore (eccezione: la pagina `Main` usa "Benvenuti", "Usa la barra di ricerca").
- **Passato remoto** per gli eventi storici (*ebbe inizio, scoppiò, accettò, fu catturato*); **presente** per le definizioni e per ciò che vale ancora oggi (*è il governo congiunto…, si dice che sta parlando Topismo*).
- Per ciò che è incerto usare formule caute tipiche della wiki: *si pensa che…*, *non è chiaro se…*, *resta, ad oggi, sconosciuto*, *a suo dire*, *presunto*.
- Elementi ricorrenti nel genere: **etimologie/acronimi comici** ("Hoi4, acronimo di …"), **"primi della storia"** (primo esercito, primo libro, prima prigione, prima Diarchia), **espressioni popolari nate dall'evento** ("da qui l'espressione ancora oggi in uso…").
- Italiano corretto, frasi complete, lunghezza paragrafi 2–5 frasi. Niente emoji nel testo (solo eventualmente dentro `.wiki-notice`).

### Struttura dell'articolo
1. **Frase introduttiva** (primo `<p>`): `La <b>Titolo</b> è / ebbe inizio …`, in grassetto il titolo, con il **contesto** e, se serve, il **link alla pagina precedente** (testo del link = nome pagina).
2. **Sezioni `h2` in ordine cronologico**, ognuna con titolo breve e descrittivo (es. *L'invasione di Martano*, *La sconfitta e la resa*, *La ribellione del 2073 aP*).
3. Schema narrativo tipico: **premessa → svolgimento → conseguenze**. Una sezione `Conseguenze` con `h3` per ciascuna conseguenza è lo schema usato per le guerre.
4. **Chiusura di raccordo** (opzionale ma consigliata): `La vicenda prosegue nella pagina <a …>Nome</a>.` per collegare la pagina alla successiva.
5. Dimensione tipica osservata: 3–7 KB di HTML, 4–10 sezioni `h2`.

### Grassetto e link
- `<b>…</b>` alla **prima menzione rilevante** di persone, popoli, luoghi, regni, oggetti, concetti chiave e date importanti (es. `<b>2073 aP</b>`).
- I **link interni** hanno **sempre** la forma `<a onclick="navigateTo('Nome Pagina')">Nome Pagina</a>`: niente `href`, niente URL, apici singoli, nome identico alla chiave di `PAGE_INDEX`.
- Linkare solo pagine **esistenti**. Un link a una pagina inesistente mostra la schermata rossa "La pagina … non esiste ancora" (le categorie come `Storia` funzionano così: vedi §6). Prima di linkare verificare in `PAGE_INDEX`.
- **NON** linkare i nomi dei personaggi presenti in `personaggi-data.js` se si vuole il tooltip: lo script salta il testo già dentro un `<a>`. Per i personaggi basta scrivere il nome esatto (con `<b>` se serve): il tooltip è automatico.
- Non usare `<a href="…">` per link interni; non usare target `_blank`.

### Date
- Le date usano il suffisso **`aP`**: `2073 aP`, `~3000 aP`, intervallo con trattino lungo: `2034 aP – 2073 aP`.
- **Non inventare né correggere date**: usare quelle fornite dall'utente o già presenti nelle pagine. Vedi §9 per le incongruenze osservate nel repository.

---

## 6. Categorie

- Nel frammento: link `<a onclick="navigateTo('Categoria')">Categoria</a>` dentro `div.wiki-cats`, **tutti nella stessa riga di struttura** del template.
- Convenzioni osservate: la **prima** categoria è la macro-categoria (`Storia`); poi eventuali periodi/ere (`Preistoria`), luoghi (`Salento`), popoli/fazioni (`CutiCuti`, `Pacci`), regni (`Regno Paccutiano`), eventi/guerre (`Guerra CutiCuti-Pacci`).
- Le categorie **non sono pagine** (non esistono in `PAGE_INDEX`, tranne quando coincidono con una pagina reale come `Guerra CutiCuti-Pacci` o `Regno Paccutiano`). Cliccando una categoria inesistente si vede il messaggio "La pagina … non esiste ancora": è il comportamento attuale del sito.
- Riusare i nomi di categoria già esistenti, scritti identici, prima di crearne di nuovi.

---

## 7. Immagini

### Immagine in articolo (formato standard)
```html
<p style="text-align:center">
<img src="img/pagine/nome-file.jpg" alt="Descrizione dell'immagine" style="max-width:100%;width:420px;border:1px solid #a2a9b1;background:#f8f9fa;padding:4px">
<br><span style="font-family:'Source Sans 3',sans-serif;font-size:11.5px;color:#54595d;">Didascalia in una riga.</span>
</p>
```

- **Percorso**: `img/pagine/<file>` **senza** `../`. Il frammento viene inserito in `index.html` (radice), quindi i percorsi si risolvono rispetto alla radice del sito, non rispetto a `pages/`.
- **Nome file**: tutto minuscolo, senza spazi/accenti, con trattini; il nome nel `src` DEVE coincidere esattamente con il file reale (GitHub Pages distingue maiuscole/minuscole).
- `alt` sempre presente e descrittivo; didascalia sempre presente, nello stile del testo ("Illustrazione rupestre attribuita ai Serranidi, raffigurante…").
- Le immagini vanno posizionate **dopo il paragrafo** che le introduce, dentro la relativa sezione.

### Immagine non ancora caricata (variante con segnaposto)
Quando l'immagine verrà aggiunta in seguito, usare `onerror` per mostrare un avviso invece dell'icona rotta:
```html
<img src="img/pagine/nome-file.jpg" alt="…" style="width:100%;max-width:480px;display:block;margin:16px auto;border:1px solid var(--border-light);border-radius:4px" onerror="this.outerHTML='<div class=&quot;wiki-notice&quot;><span class=&quot;ni&quot;>🖼️</span><span>Immagine non ancora caricata. Aggiungi <b>nome-file.jpg</b> in <code>img/pagine/</code> per mostrarla qui.</span></div>'">
```

### Immagini dei personaggi (tooltip)
- File in `img/personaggi/`, registrati in `personaggi-data.js`:
  ```js
  "Nome Esatto": "img/personaggi/nome-esatto.jpg",
  ```
- Il nome DEVE comparire nel testo **esattamente** come in `PERSONAGGI_IMG` (maiuscole comprese). Se un nome ne contiene un altro, vince il più lungo.
- L'estensione può essere sbagliata: lo script prova automaticamente `png, jpg, jpeg, webp, gif`. Conviene comunque indicare l'estensione reale.
- Ogni nome di PERSONAGGI_IMG compare con tooltip in tutte le pagine, anche se non esiste una pagina dedicata (è voluto: "non serve creare una pagina solo per mostrare una faccia").

---

## 8. Procedura per creare una nuova pagina (checklist)

1. Scegliere il **nome canonico** (senza apostrofi) e calcolare lo **slug**.
2. Creare `pages/<slug>.html` col template del §2 (infobox, h1, subtitle, corpo, categorie).
3. Aggiungere la voce in `PAGE_INDEX` (`index.html`) nel punto giusto dell'ordine cronologico, con `file`, `title`, `categorie` coerenti col frammento.
4. Collegare la pagina da almeno **un'altra pagina** (link `navigateTo`) e, se è importante, aggiungerla all'elenco **"In evidenza"** di `pages/main.html`. Così risulta raggiungibile e compare in "Citato in".
5. Se compaiono nuovi personaggi/entità con volto: aggiungere riga in `personaggi-data.js` + immagine in `img/personaggi/`.
6. Se ci sono immagini: file in `img/pagine/` con nome minuscolo e `src` identico.
7. Se la pagina ne **precede/segue** un'altra, aggiungere i link di raccordo reciproci.

### Checklist di validazione (da eseguire prima di consegnare)
- [ ] Il frammento NON contiene `<html>`, `<head>`, `<body>`, `<script>`.
- [ ] Ordine blocchi: infobox → h1 → subtitle → wiki-article-body → wiki-cats.
- [ ] Il testo dell'`h1`, dell'`infobox-title`, la chiave di `PAGE_INDEX` e il `title` coincidono.
- [ ] Tutti i `navigateTo('…')` puntano a chiavi esistenti di `PAGE_INDEX` (le categorie fanno eccezione, vedi §6), con apici singoli e nome identico.
- [ ] Nessun apostrofo nel nome della pagina o nelle chiavi.
- [ ] Nessun `href` per link interni; nessun CSS inline salvo quello delle immagini.
- [ ] Immagini: percorso `img/pagine/…` senza `../`, nome file minuscolo e coincidente col file.
- [ ] `categorie` in `PAGE_INDEX` = link in `div.wiki-cats`.
- [ ] Date e fatti coerenti con le pagine esistenti (nessuna contraddizione nuova).
- [ ] Tutti i tag HTML sono chiusi (`</div>`, `</p>`, `</ul>`…).

---

## 9. Anomalie osservate nel repository (da non replicare, da segnalare)

Queste sono incoerenze presenti nei file analizzati. Un'IA che lavora sul progetto NON deve imitarle, e dovrebbe segnalarle all'utente prima di "correggerle" di sua iniziativa (soprattutto quelle sui contenuti).

**Tecniche**
1. `pages/la-fine-del-regno-paccutiano.html` usa `../img/pagine/…` per l'immagine: dovrebbe essere `img/pagine/…` (vedi §7). Funziona comunque il segnaposto `onerror`.
2. `le-origini.html` nella radice (copia legacy) usa `../img/pagine/…` e `Pacci-cantante.jpg` con la P maiuscola, mentre il file reale è `pacci-cantante.jpg`: su GitHub Pages quel nome non verrebbe trovato. La versione corretta è `pages/le-origini.html`.
3. In `index.html` il blocco `<div id="wiki-layout">` è aperto due volte di seguito (e chiuso una volta sola): errore di markup da sistemare.
4. `personaggi-data.js` dichiara molte immagini `.jpg` che nel repository sono `.png` (es. `dinamike`, `braw-starls`, `regno-dei-cuticuti`, `regno-dei-pacci`) e altre non presenti (es. `nestola`, `filippo`, `t-ciano`, `topus-maximus`): il fallback delle estensioni copre solo il primo caso.
5. `initLogoDinamico()` cerca `logo.jpg`, `morello.jpg`, `filippo.jpg`, `alessio.jpg`, `ludovico.jpg` nella radice, ma il repository non contiene nessuno di questi file (resta l'icona 🌐 di fallback).
6. Il campo `categorie` di `PAGE_INDEX` non è usato dallo script (solo `file` e `title`); è un metadato da tenere allineato a mano con `div.wiki-cats`. In `La Fine del Regno Paccutiano` i due elenchi non coincidono (la pagina cita anche la categoria `La Diarchia del Salento`).

**Contenutistiche (cronologia `aP`)**
7. La scala delle date non è coerente: `Le Origini` parte da ~3000 aP e i regni nascono nel 2008/2009 aP (numeri che scendono avvicinandosi al presente), ma poi la guerra va dal 2034 aP al 2073 aP e la Diarchia parte dal 2073 aP (numeri che salgono), mentre l'assedio è del 2065 aP e `La Fine del Regno Paccutiano` va dal 2065 aP al 2064 aP (di nuovo in discesa). Fino a decisione dell'autore, **non normalizzare le date e non usarle per dedurre l'ordine temporale**: usare solo quelle già scritte.

---

## 10. Sintesi in una riga per l'IA

> Una pagina è un frammento HTML `pages/<slug>.html` composto da `infobox` (opz.) → `h1.page-title` → `page-subtitle` fisso → `wiki-article-body` (grassetti, `h2/h3`, link `onclick="navigateTo('Nome')"`, immagini `img/pagine/…`) → `wiki-cats`; va registrata in `PAGE_INDEX` con `file`, `title`, `categorie`, scritta in tono enciclopedico serio su materia assurda, al passato remoto, senza apostrofi nel titolo, e collegata ad almeno un'altra pagina.
