# Pocchiaciclopedia

Pocchiaciclopedia libera (quasi).

## Struttura

```
index.html            pagina principale (solo struttura)
loader.js             scarica le pagine e poi avvia il sito
pages-index.js        elenco delle pagine (nome, titolo, file)
pages/                UNA PAGINA PER FILE (72 pagine in HTML)
redirect-data.js      nomi dei personaggi -> pagina e sezione in cui si trova la loro scheda
wiki-script.js        logica del sito: navigazione, ricerca, tooltip
wiki-style.css        stile del sito
gate.js / gate-style.css   schermata di accesso
logo.js               logo casuale
personaggi-data.js    nomi -> immagini per i tooltip
wikigacha.html        gioco delle carte
img/
  logo.jpg
  personaggi/         immagini usate dai tooltip
  pagine/             immagini usate negli articoli
archivio/             vecchi file non più usati dal sito
```

Il sito va aperto da un server (GitHub Pages va bene): le pagine vengono scaricate con `fetch`.

## Come funzionano i personaggi

I personaggi non hanno più una pagina propria. La loro scheda sta nella sezione **Protagonisti** della
pagina dell'evento in cui compaiono (guerre, eventi, periodi storici). Un link a un personaggio porta
alla sua sezione, che si evidenzia per un attimo. Il nome compare anche nella ricerca.

Per aggiungere un personaggio:
1. scrivi la sua scheda dentro la pagina dell'evento, in un blocco `<div class="bio-block" id="bio-nome">`;
2. aggiungi in `redirect-data.js`: `"Nome": { page: "Nome pagina", anchor: "bio-nome" }`;
3. (facoltativo) per il tooltip con l'immagine aggiungi una riga in `personaggi-data.js`.

## Aggiungere una pagina

1. crea `pages/nome-pagina.html` con il contenuto;
2. aggiungi una voce in `pages-index.js`: `{ "name": "Nome pagina", "title": "Nome pagina", "file": "nome-pagina.html" }`.
