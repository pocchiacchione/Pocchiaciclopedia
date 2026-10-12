// Elenco delle pagine: nome, titolo e file in pages/.
// Per aggiungere una pagina: crea pages/nome.html e aggiungi una riga qui.
const PAGES_INDEX = [
  {
  "name": "Main",
  "title": "Pocchiaciclopedia — Pagina principale",
  "file": "main.html",
  "wikitext": "Pagina principale di Pocchiaciclopedia."
  },
  {
  "name": "Le Origini",
  "title": "Le Origini",
  "file": "le-origini.html"
  },
  {
  "name": "Napoli",
  "title": "Napoli",
  "file": "napoli.html"
  },
  {
  "name": "Clan Spisso",
  "title": "Clan Spisso",
  "file": "clan-spisso.html"
  },
  {
  "name": "Famiglia Pocchia",
  "title": "Famiglia Pocchia",
  "file": "famiglia-pocchia.html"
  },
  {
  "name": "Calendario Morello",
  "title": "Calendario Morello",
  "file": "calendario-morello.html"
  },
  {
  "name": "Topismo",
  "title": "Topismo",
  "file": "topismo.html"
  },
  {
  "name": "Serrano",
  "title": "Serrano",
  "file": "serrano.html"
  },
  {
  "name": "F.O.N.D.A.M.E.N.T.A.",
  "title": "F.O.N.D.A.M.E.N.T.A.",
  "file": "f-o-n-d-a-m-e-n-t-a.html"
  },
  {
  "name": "L.E.G.G.I.",
  "title": "L.E.G.G.I.",
  "file": "l-e-g-g-i.html"
  },
  {
  "name": "Camorra Salentina",
  "title": "Camorra Salentina",
  "file": "camorra-salentina.html"
  },
  {
  "name": "Avengers",
  "title": "Avengers",
  "file": "avengers.html"
  },
  {
  "name": "Prima Guerra degli Avengers",
  "title": "Prima Guerra degli Avengers",
  "file": "prima-guerra-degli-avengers.html"
  },
  {
  "name": "Seconda Guerra degli Avengers",
  "title": "Seconda Guerra degli Avengers",
  "file": "seconda-guerra-degli-avengers.html"
  },
  {
  "name": "America (Avengers)",
  "title": "America (Avengers)",
  "file": "america-avengers.html"
  },
  {
  "name": "Nigeria Spartiana",
  "title": "Nigeria Spartiana",
  "file": "nigeria-spartiana.html"
  },
  {
  "name": "104 Nigeriani",
  "title": "104 Nigeriani",
  "file": "104-nigeriani.html"
  },
  {
  "name": "Benito Mussolini",
  "title": "Benito Mussolini",
  "file": "benito-mussolini.html"
  },
  {
  "name": "Filippine",
  "title": "Filippine",
  "file": "filippine.html"
  },
  {
  "name": "Raggio Nero",
  "title": "Raggio Nero",
  "file": "raggio-nero.html"
  },
  {
  "name": "La Prima Guerra Pocchiana",
  "title": "La Prima Guerra Pocchiana",
  "file": "la-prima-guerra-pocchiana.html"
  },
  {
  "name": "Bomba Spissica",
  "title": "Bomba Spissica",
  "file": "bomba-spissica.html"
  },
  {
  "name": "Operazione Brick",
  "title": "Operazione Brick",
  "file": "operazione-brick.html"
  },
  {
  "name": "Calimera",
  "title": "Calimera",
  "file": "calimera.html"
  },
  {
  "name": "Castri",
  "title": "Castri",
  "file": "castri.html"
  },
  {
  "name": "Terza Guerra degli Avengers",
  "title": "Terza Guerra degli Avengers",
  "file": "terza-guerra-degli-avengers.html"
  },
  {
  "name": "Minerale Spisso",
  "title": "Minerale Spisso",
  "file": "minerale-spisso.html"
  },
  {
  "name": "La guerra delle Piante contro gli Zombi",
  "title": "La guerra delle Piante contro gli Zombi",
  "file": "la-guerra-delle-piante-contro-gli-zombi.html"
  },
  {
  "name": "Pianeta Zecca",
  "title": "Pianeta Zecca",
  "file": "pianeta-zecca.html"
  },
  {
  "name": "Stati Uniti d'America",
  "title": "Stati Uniti d'America",
  "file": "stati-uniti-d-america.html"
  },
  {
  "name": "La Cantina",
  "title": "La Cantina",
  "file": "la-cantina.html"
  },
  {
  "name": "Prima Comunione di Zella",
  "title": "Prima Comunione di Zella",
  "file": "prima-comunione-di-zella.html"
  },
  {
  "name": "La caduta di Napoli",
  "title": "La caduta di Napoli",
  "file": "la-caduta-di-napoli.html"
  },
  {
  "name": "Martano",
  "title": "Martano",
  "file": "martano.html"
  },
  {
  "name": "Il Cheddar",
  "title": "Il Cheddar",
  "file": "il-cheddar.html"
  },
  {
  "name": "Grande Spaccatura degli Sbost",
  "title": "Grande Spaccatura degli Sbost",
  "file": "grande-spaccatura-degli-sbost.html"
  },
  {
  "name": "Corigliano",
  "title": "Corigliano",
  "file": "corigliano.html"
  },
  {
  "name": "La Grande Partita tra le Fiamme",
  "title": "La Grande Partita tra le Fiamme",
  "file": "la-grande-partita-tra-le-fiamme.html"
  },
  {
  "name": "The United Kingdom of Great Britain and France",
  "title": "The United Kingdom of Great Britain and France",
  "file": "the-united-kingdom-of-great-britain-and-france.html"
  },
  {
  "name": "Editto di Colella",
  "title": "Editto di Colella",
  "file": "editto-di-colella.html"
  },
  {
  "name": "Regno d'Italia",
  "title": "Regno d'Italia",
  "file": "regno-d-italia.html"
  },
  {
  "name": "Partito Democratico di Castri (Charlie Sbirk)",
  "title": "Partito Democratico di Castri (Charlie Sbirk)",
  "file": "partito-democratico-di-castri-charlie-sbirk.html"
  },
  {
  "name": "Alleanza per la Verità",
  "title": "Alleanza per la Verità",
  "file": "alleanza-per-la-verita.html"
  },
  {
  "name": "Partito Democratico dei Puma",
  "title": "Partito Democratico dei Puma",
  "file": "partito-democratico-dei-puma.html"
  },
  {
  "name": "Rivolta di Castri",
  "title": "Rivolta di Castri",
  "file": "rivolta-di-castri.html"
  },
  {
  "name": "Processo a Charlie Sbirk",
  "title": "Processo a Charlie Sbirk",
  "file": "processo-a-charlie-sbirk.html"
  },
  {
  "name": "Repubblica di Serrano",
  "title": "Repubblica di Serrano",
  "file": "repubblica-di-serrano.html"
  },
  {
  "name": "Isola di Flavio",
  "title": "Isola di Flavio",
  "file": "isola-di-flavio.html"
  },
  {
  "name": "Ebraismo",
  "title": "Ebraismo",
  "file": "ebraismo.html"
  },
  {
  "name": "La Sfida di Nestola al Topismo",
  "title": "La Sfida di Nestola al Topismo",
  "file": "la-sfida-di-nestola-al-topismo.html"
  },
  {
  "name": "Spicci",
  "title": "Spicci",
  "file": "spicci.html"
  },
  {
  "name": "Giachele",
  "title": "Giachele",
  "file": "giachele.html"
  },
  {
  "name": "Tom and Max",
  "title": "Tom and Max",
  "file": "tom-and-max.html"
  },
  {
  "name": "Tom and Jerry",
  "title": "Tom and Jerry",
  "file": "tom-and-jerry.html"
  },
  {
  "name": "Gli esordi di Tom and Jerry",
  "title": "Gli esordi di Tom and Jerry",
  "file": "gli-esordi-di-tom-and-jerry.html"
  },
  {
  "name": "I Puma",
  "title": "I Puma",
  "file": "i-puma.html"
  },
  {
  "name": "Vandalismo Democratico di Serrano",
  "title": "Vandalismo Democratico di Serrano",
  "file": "vandalismo-democratico-di-serrano.html"
  },
  {
  "name": "Avventure di Alessio e Rashid in India",
  "title": "Avventure di Alessio e Rashid in India",
  "file": "avventure-di-alessio-e-rashid-in-india.html"
  },
  {
  "name": "La Caccia a Giachele",
  "title": "La Caccia a Giachele",
  "file": "la-caccia-a-giachele.html"
  },
  {
  "name": "Protettorato del Clan Spisso",
  "title": "Protettorato del Clan Spisso",
  "file": "protettorato-del-clan-spisso.html"
  },
  {
  "name": "Stato Topista di Serrano",
  "title": "Stato Topista di Serrano",
  "file": "stato-topista-di-serrano.html"
  },
  {
  "name": "Stato Topista Unito",
  "title": "Stato Topista Unito",
  "file": "stato-topista-unito.html"
  },
  {
  "name": "Governo Militare degli Avengers",
  "title": "Governo Militare degli Avengers",
  "file": "governo-militare-degli-avengers.html"
  },
  {
  "name": "Ducato di Serrano",
  "title": "Ducato di Serrano",
  "file": "ducato-di-serrano.html"
  },
  {
  "name": "Unificazione Italiana (231 dM)",
  "title": "Unificazione Italiana (231 dM)",
  "file": "unificazione-italiana-231-dm.html"
  },
  {
  "name": "Repubblica Italiana",
  "title": "Repubblica Italiana",
  "file": "repubblica-italiana.html"
  },
  {
  "name": "Principato di Napoli (Età dell'Oro)",
  "title": "Principato di Napoli (Età dell'Oro)",
  "file": "principato-di-napoli-eta-dell-oro.html"
  },
  {
  "name": "Napoli Sporca",
  "title": "Napoli Sporca",
  "file": "napoli-sporca.html"
  },
  {
  "name": "Secondo Principato di Napoli",
  "title": "Secondo Principato di Napoli",
  "file": "secondo-principato-di-napoli.html"
  },
  {
  "name": "Occupazione della Cantina di Napoli",
  "title": "Occupazione della Cantina di Napoli",
  "file": "occupazione-della-cantina-di-napoli.html"
  },
  {
  "name": "Terzo Principato di Napoli",
  "title": "Terzo Principato di Napoli",
  "file": "terzo-principato-di-napoli.html"
  },
  {
  "name": "La guerra delle Piante contro gli Zombi 2",
  "title": "La guerra delle Piante contro gli Zombi 2",
  "file": "la-guerra-delle-piante-contro-gli-zombi-2.html"
  }
];
