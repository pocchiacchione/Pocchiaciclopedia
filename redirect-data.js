// Nomi di pagina che non esistono più come pagine a sé (personaggi e voci accorpate): portano alla
// pagina in cui ora si trova la loro scheda o sezione. "anchor" è la sezione dentro la pagina.
const REDIRECTS = {
 "Ludovico Pio Tommasi": {
  "page": "Le Origini",
  "anchor": "bio-ludovico-pio-tommasi"
 },
 "VitoCarlo Tommasi": {
  "page": "Le Origini",
  "anchor": "bio-vitocarlo-tommasi"
 },
 "Giovanni Zecca": {
  "page": "Martano",
  "anchor": "bio-giovanni-zecca"
 },
 "Pierpaolo": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "bio-pierpaolo"
 },
 "Morello": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "bio-morello"
 },
 "Sal da Spicci": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "bio-sal-da-spicci"
 },
 "Sal da Vinci": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "bio-sal-da-vinci"
 },
 "De Morellis": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "bio-de-morellis"
 },
 "Ermenegildo Spisso": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "bio-ermenegildo-spisso"
 },
 "Mancarella": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "bio-mancarella"
 },
 "Ignoto di Napoli": {
  "page": "Le Origini",
  "anchor": "bio-ignoto-di-napoli"
 },
 "Riccardo Pascali": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "bio-riccardo-pascali"
 },
 "Ilaria Spisso": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "bio-ilaria-spisso"
 },
 "Spisshor": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "bio-spisshor"
 },
 "Gianluca Pascali": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-gianluca-pascali"
 },
 "Anna Pocchia": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-anna-pocchia"
 },
 "Iron Spisso Man": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-iron-spisso-man"
 },
 "Zella": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-zella"
 },
 "Valerio Mozzarella": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-valerio-mozzarella"
 },
 "Nicolò": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-nicolo"
 },
 "Francesco Maggiore": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-francesco-maggiore"
 },
 "Emanuele Pascali": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-emanuele-pascali"
 },
 "Spider Trovè": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-spider-trove"
 },
 "Alex Spisso": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "bio-alex-spisso"
 },
 "Cheddar Mussolini": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "bio-cheddar-mussolini"
 },
 "Filippo Pascali": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "bio-filippo-pascali"
 },
 "Alice Sportella": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "bio-alice-sportella"
 },
 "Alessio Spisso": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "bio-alessio-spisso"
 },
 "Pete Hegseth": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "bio-pete-hegseth"
 },
 "Topus Maximus": {
  "page": "Stato Topista e Topismo",
  "anchor": "bio-topus-maximus"
 },
 "La Fede": {
  "page": "Stato Topista e Topismo",
  "anchor": "bio-la-fede"
 },
 "Zio di Sbost": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "bio-zio-di-sbost"
 },
 "Elisa Sbost": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "bio-elisa-sbost"
 },
 "Primo Clone dello Zio di Sbost": {
  "page": "Guerra delle Piante contro gli Zombi",
  "anchor": "bio-primo-clone-dello-zio-di-sbost"
 },
 "AleDoria": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "bio-aledoria"
 },
 "Jacopo Martucci": {
  "page": "Grande Partita",
  "anchor": "bio-jacopo-martucci"
 },
 "Bomber": {
  "page": "Grande Partita",
  "anchor": "bio-bomber"
 },
 "Renna": {
  "page": "Grande Partita",
  "anchor": "bio-renna"
 },
 "Deta": {
  "page": "Grande Partita",
  "anchor": "bio-deta"
 },
 "Giulia Donno": {
  "page": "Grande Partita",
  "anchor": "bio-giulia-donno"
 },
 "Massimo Floris": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-massimo-floris"
 },
 "Rashid": {
  "page": "Avventure in India",
  "anchor": "bio-rashid"
 },
 "MariaTeresa Friolo": {
  "page": "Avventure in India",
  "anchor": "bio-mariateresa-friolo"
 },
 "Luca Pascali": {
  "page": "Caccia a Giachele",
  "anchor": "bio-luca-pascali"
 },
 "Figli di Filippo": {
  "page": "Caccia a Giachele",
  "anchor": "bio-figli-di-filippo"
 },
 "Il Ciciliano": {
  "page": "Caccia a Giachele",
  "anchor": "bio-il-ciciliano"
 },
 "Greta Rizzo": {
  "page": "Caccia a Giachele",
  "anchor": "bio-greta-rizzo"
 },
 "Nestola": {
  "page": "Sfida di Nestola",
  "anchor": "bio-nestola"
 },
 "Carola la Rosa": {
  "page": "Processo dell'Isola di Flavio",
  "anchor": "bio-carola-la-rosa"
 },
 "Carola Feudo": {
  "page": "Processo dell'Isola di Flavio",
  "anchor": "bio-carola-feudo"
 },
 "Anna Colella": {
  "page": "Editto di Colella",
  "anchor": "bio-anna-colella"
 },
 "Maria Marzo": {
  "page": "Editto di Colella",
  "anchor": "bio-maria-marzo"
 },
 "Calogiuri": {
  "page": "Editto di Colella",
  "anchor": "bio-calogiuri"
 },
 "Tommaso Pascali": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-tommaso-pascali"
 },
 "Massimiliano Dimitri": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-massimiliano-dimitri"
 },
 "Jerry": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-jerry"
 },
 "Nicolò Donno": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "bio-nicolo-donno"
 },
 "Antonio Cazzato": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "bio-antonio-cazzato"
 },
 "Maria Grazia Calò": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "bio-maria-grazia-calo"
 },
 "Andrea Sponziello": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "bio-andrea-sponziello"
 },
 "Flavia Aventeggiato": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "bio-flavia-aventeggiato"
 },
 "Zella (Avengers)": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "bio-zella"
 },
 "Proclamazione Regno d'Italia": {
  "page": "Unificazione Italiana",
  "anchor": "sec-regno-ditalia"
 },
 "Referendum Unificazione 230 dM": {
  "page": "Unificazione Italiana",
  "anchor": "sec-unificazione-italiana-231-dm"
 },
 "Il Cheddar": {
  "page": "Le Origini",
  "anchor": "sec-il-cheddar"
 },
 "Sistema Cheddar": {
  "page": "Le Origini",
  "anchor": "sec-sistema-cheddar"
 },
 "Sole": {
  "page": "Le Origini",
  "anchor": "sec-sole"
 },
 "Luna": {
  "page": "Le Origini",
  "anchor": "sec-luna"
 },
 "I Mille Occhi di Ludo": {
  "page": "Le Origini",
  "anchor": "sec-i-mille-occhi-di-ludo"
 },
 "F.O.N.D.A.M.E.N.T.A.": {
  "page": "Le Origini",
  "anchor": "sec-f-o-n-d-a-m-e-n-t-a"
 },
 "L.E.G.G.I.": {
  "page": "Le Origini",
  "anchor": "sec-l-e-g-g-i"
 },
 "Calendario Morello": {
  "page": "Le Origini",
  "anchor": "sec-calendario-morello"
 },
 "Napoli": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "sec-napoli"
 },
 "Principato di Napoli (Età dell'Oro)": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "sec-principato-di-napoli-eta-delloro"
 },
 "Spicci": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "sec-spicci"
 },
 "Napoli Sporca": {
  "page": "Età dell'Oro e Spicci",
  "anchor": "sec-napoli-sporca"
 },
 "Clan Spisso": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "sec-clan-spisso"
 },
 "Protettorato del Clan Spisso": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "sec-protettorato-del-clan-spisso"
 },
 "Camorra Salentina": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "sec-camorra-salentina"
 },
 "Operazione Brick": {
  "page": "Protettorato del Clan Spisso e Operazione Brick",
  "anchor": "sec-operazione-brick"
 },
 "Topismo": {
  "page": "Stato Topista e Topismo",
  "anchor": "sec-topismo"
 },
 "Stato Topista di Serrano": {
  "page": "Stato Topista e Topismo",
  "anchor": "sec-stato-topista-di-serrano"
 },
 "Stato Topista Unito": {
  "page": "Stato Topista e Topismo",
  "anchor": "sec-stato-topista-unito"
 },
 "Avengers": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-avengers"
 },
 "Prima Comunione di Zella": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-prima-comunione-di-zella"
 },
 "Famiglia Pocchia": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-famiglia-pocchia"
 },
 "Prima Guerra degli Avengers": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-prima-guerra-degli-avengers"
 },
 "Seconda Guerra degli Avengers": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-seconda-guerra-degli-avengers"
 },
 "Filippine": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-filippine"
 },
 "Calimera": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-calimera"
 },
 "Tom and Max": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-tom-and-max"
 },
 "Gli esordi di Tom and Jerry": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-gli-esordi-di-tom-and-jerry"
 },
 "Tom and Jerry": {
  "page": "Prime due Guerre degli Avengers e Prima Comunione di Zella",
  "anchor": "sec-tom-and-jerry"
 },
 "Avventure di Alessio e Rashid in India": {
  "page": "Avventure in India",
  "anchor": "sec-avventure-di-alessio-e-rashid-in-india"
 },
 "La Prima Guerra Pocchiana": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-la-prima-guerra-pocchiana"
 },
 "Nigeria Spartiana": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-nigeria-spartiana"
 },
 "104 Nigeriani": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-104-nigeriani"
 },
 "Raggio Nero": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-raggio-nero"
 },
 "Governo Militare degli Avengers": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-governo-militare-degli-avengers"
 },
 "Bomba Spissica": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-bomba-spissica"
 },
 "Serrano": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-serrano"
 },
 "Ducato di Serrano": {
  "page": "Prima Guerra Pocchiana e Bomba Spissica",
  "anchor": "sec-ducato-di-serrano"
 },
 "Terza Guerra degli Avengers": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-terza-guerra-degli-avengers"
 },
 "Minerale Spisso": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-minerale-spisso"
 },
 "America (Avengers)": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-america-avengers"
 },
 "Stati Uniti d'America": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-stati-uniti-damerica"
 },
 "La Cantina": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-la-cantina"
 },
 "Castri": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-castri"
 },
 "Secondo Principato di Napoli": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-secondo-principato-di-napoli"
 },
 "La caduta di Napoli": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-la-caduta-di-napoli"
 },
 "Occupazione della Cantina di Napoli": {
  "page": "Terza Guerra e Caduta di Napoli",
  "anchor": "sec-occupazione-della-cantina-di-napoli"
 },
 "Pianeta Zecca": {
  "page": "Martano",
  "anchor": "sec-pianeta-zecca"
 },
 "La guerra delle Piante contro gli Zombi": {
  "page": "Guerra delle Piante contro gli Zombi",
  "anchor": "sec-la-guerra-delle-piante-contro-gli-zombi"
 },
 "La guerra delle Piante contro gli Zombi 2": {
  "page": "Guerra delle Piante contro gli Zombi",
  "anchor": "sec-la-guerra-delle-piante-contro-gli-zombi-2"
 },
 "Terzo Principato di Napoli": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "sec-terzo-principato-di-napoli"
 },
 "I Puma": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "sec-i-puma"
 },
 "Vandalismo Democratico di Serrano": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "sec-vandalismo-democratico-di-serrano"
 },
 "Partito Democratico dei Puma": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "sec-partito-democratico-dei-puma"
 },
 "Repubblica di Serrano": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "sec-repubblica-di-serrano"
 },
 "La Grande Partita tra le Fiamme": {
  "page": "Grande Partita",
  "anchor": "sec-la-grande-partita-tra-le-fiamme"
 },
 "Corigliano": {
  "page": "Grande Partita",
  "anchor": "sec-corigliano"
 },
 "La Sfida di Nestola al Topismo": {
  "page": "Sfida di Nestola",
  "anchor": "sec-la-sfida-di-nestola-al-topismo"
 },
 "Ebraismo": {
  "page": "Sfida di Nestola",
  "anchor": "sec-ebraismo"
 },
 "La Caccia a Giachele": {
  "page": "Caccia a Giachele",
  "anchor": "sec-la-caccia-a-giachele"
 },
 "Giachele": {
  "page": "Caccia a Giachele",
  "anchor": "sec-giachele"
 },
 "Partito Democratico di Castri (Charlie Sbirk)": {
  "page": "Rivolta e Processo a Charlie Sbirk",
  "anchor": "sec-partito-democratico-di-castri-charlie-sbirk"
 },
 "Alleanza per la Verità": {
  "page": "Rivolta e Processo a Charlie Sbirk",
  "anchor": "sec-alleanza-per-la-verita"
 },
 "Rivolta di Castri": {
  "page": "Rivolta e Processo a Charlie Sbirk",
  "anchor": "sec-rivolta-di-castri"
 },
 "Processo a Charlie Sbirk": {
  "page": "Rivolta e Processo a Charlie Sbirk",
  "anchor": "sec-processo-a-charlie-sbirk"
 },
 "The United Kingdom of Great Britain and France": {
  "page": "Editto di Colella",
  "anchor": "sec-the-united-kingdom-of-great-britain-and-france"
 },
 "Terranova": {
  "page": "Editto di Colella",
  "anchor": "sec-terranova"
 },
 "Terranova (Newfoundland)": {
  "page": "Editto di Colella",
  "anchor": "sec-terranova"
 },
 "Guerra Americana": {
  "page": "Editto di Colella",
  "anchor": "sec-guerra-americana"
 },
 "New York Inglese": {
  "page": "Editto di Colella",
  "anchor": "sec-new-york-inglese"
 },
 "New York Inglese (New London)": {
  "page": "Editto di Colella",
  "anchor": "sec-new-york-inglese"
 },
 "Regno d'Italia": {
  "page": "Unificazione Italiana",
  "anchor": "sec-regno-ditalia"
 },
 "Unificazione Italiana (231 dM)": {
  "page": "Unificazione Italiana",
  "anchor": "sec-unificazione-italiana-231-dm"
 },
 "Isola di Flavio": {
  "page": "Processo dell'Isola di Flavio",
  "anchor": "sec-isola-di-flavio"
 },
 "Repubblica Italiana": {
  "page": "Processo dell'Isola di Flavio",
  "anchor": "sec-repubblica-italiana"
 },
 "Cheddar acido": {
  "page": "Le Origini",
  "anchor": "sec-il-cheddar-cheddaracido-c"
 },
 "Proclamazione del Regno d'Italia e Unificazione": {
  "page": "Unificazione Italiana",
  "anchor": null
 }
};
