# Pocchiaciclopedia

Pocchiaciclopedia libera (quasi).

## Struttura

```
index.html            pagina principale (solo struttura)
loader.js             scarica le pagine e poi avvia il sito
pages-index.js        elenco delle pagine (Main + 2 voci)
pages/                UNA VOCE PER FILE: le 18 voci + main.html
redirect-data.js      vecchi nomi di pagina/personaggio -> voce e sezione in cui si trovano ora
wiki-script.js / wiki-style.css   logica e stile
gate.js / gate-style.css          schermata di accesso
personaggi-data.js    nomi di personaggi e organizzazioni -> immagini per i tooltip
img/                  immagini
archivio/             vecchi file non più usati dal sito
```

## Le 18 voci

Ogni voce contiene sezioni (una per vecchia pagina) e, dove ci sono, le schede dei personaggi.

| Voce | Vecchie pagine contenute |
|---|---|
| Le Origini | Le Origini, Il Cheddar, (archivio) sistema-cheddar, (archivio) sole, (archivio) luna, (archivio) mille-occhi-di-ludo, F.O.N.D.A.M.E.N.T.A., L.E.G.G.I., Calendario Morello |
| Età dell'Oro e Spicci | Napoli, Principato di Napoli (Età dell'Oro), Spicci, Napoli Sporca |
| Protettorato del Clan Spisso e Operazione Brick | Clan Spisso, (archivio) carmelo-spisso, (archivio) benito-mussolini, Protettorato del Clan Spisso, Camorra Salentina, Operazione Brick |
| Stato Topista e Topismo | Topismo, Stato Topista di Serrano, Stato Topista Unito |
| Prime due Guerre degli Avengers e Prima Comunione di Zella | Avengers, Prima Comunione di Zella, Famiglia Pocchia, Prima Guerra degli Avengers, Seconda Guerra degli Avengers, Filippine, Calimera, Tom and Max, Gli esordi di Tom and Jerry, Tom and Jerry |
| Avventure in India | Avventure di Alessio e Rashid in India |
| Prima Guerra Pocchiana e Bomba Spissica | La Prima Guerra Pocchiana, Nigeria Spartiana, 104 Nigeriani, Raggio Nero, Governo Militare degli Avengers, Bomba Spissica, Serrano, Ducato di Serrano |
| Terza Guerra e Caduta di Napoli | Terza Guerra degli Avengers, Minerale Spisso, (archivio) america-avengers, Stati Uniti d'America, La Cantina, Castri, Secondo Principato di Napoli, La caduta di Napoli, Occupazione della Cantina di Napoli |
| Martano | Martano, Pianeta Zecca |
| Guerra delle Piante contro gli Zombi | La guerra delle Piante contro gli Zombi, La guerra delle Piante contro gli Zombi 2 |
| Grande Spaccatura degli Sbost | Grande Spaccatura degli Sbost, Terzo Principato di Napoli, I Puma, Vandalismo Democratico di Serrano, Partito Democratico dei Puma, Repubblica di Serrano |
| Grande Partita | La Grande Partita tra le Fiamme, Corigliano |
| Sfida di Nestola | La Sfida di Nestola al Topismo, Ebraismo |
| Caccia a Giachele | La Caccia a Giachele, Giachele |
| Rivolta e Processo a Charlie Sbirk | Partito Democratico di Castri (Charlie Sbirk), Alleanza per la Verità, Rivolta di Castri, Processo a Charlie Sbirk |
| Editto di Colella | Editto di Colella, The United Kingdom of Great Britain and France, (archivio) terranova, (archivio) guerra-americana, (archivio) new-york-inglese |
| Unificazione Italiana | Regno d'Italia, Unificazione Italiana (231 dM) |
| Processo dell'Isola di Flavio | Isola di Flavio, La fine della monarchia, Repubblica Italiana |

I vecchi nomi funzionano ancora: `navigateTo('Sole')` apre Le Origini alla sezione Sole.

## Aggiungere un personaggio o un'organizzazione

1. scrivi la scheda in un `<div class="bio-block" id="bio-nome">` dentro la voce giusta;
2. aggiungi in `redirect-data.js`: `"Nome": { "page": "Titolo voce", "anchor": "bio-nome" }`;
3. per il tooltip con l'immagine aggiungi una riga in `personaggi-data.js` (vale anche per le organizzazioni).
