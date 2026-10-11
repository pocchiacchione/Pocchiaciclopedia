// Nomi di pagina che non esistono più come pagine a sé (personaggi): portano alla
// pagina in cui ora si trova la loro scheda. "anchor" è la sezione dentro la pagina.
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
  "page": "Pianeta Zecca",
  "anchor": "bio-giovanni-zecca"
 },
 "Pierpaolo": {
  "page": "Principato di Napoli (Età dell'Oro)",
  "anchor": "bio-pierpaolo"
 },
 "Morello": {
  "page": "Principato di Napoli (Età dell'Oro)",
  "anchor": "bio-morello"
 },
 "Sal da Spicci": {
  "page": "Principato di Napoli (Età dell'Oro)",
  "anchor": "bio-sal-da-spicci"
 },
 "Sal da Vinci": {
  "page": "Principato di Napoli (Età dell'Oro)",
  "anchor": "bio-sal-da-vinci"
 },
 "De Morellis": {
  "page": "Secondo Principato di Napoli",
  "anchor": "bio-de-morellis"
 },
 "Ermenegildo Spisso": {
  "page": "F.O.N.D.A.M.E.N.T.A.",
  "anchor": "bio-ermenegildo-spisso"
 },
 "Mancarella": {
  "page": "F.O.N.D.A.M.E.N.T.A.",
  "anchor": "bio-mancarella"
 },
 "Ignoto di Napoli": {
  "page": "L.E.G.G.I.",
  "anchor": "bio-ignoto-di-napoli"
 },
 "Riccardo Pascali": {
  "page": "Operazione Brick",
  "anchor": "bio-riccardo-pascali"
 },
 "Ilaria Spisso": {
  "page": "Operazione Brick",
  "anchor": "bio-ilaria-spisso"
 },
 "Spisshor": {
  "page": "Operazione Brick",
  "anchor": "bio-spisshor"
 },
 "Gianluca Pascali": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-gianluca-pascali"
 },
 "Anna Pocchia": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-anna-pocchia"
 },
 "Iron Spisso Man": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-iron-spisso-man"
 },
 "Zella": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-zella"
 },
 "Valerio Mozzarella": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-valerio-mozzarella"
 },
 "Nicolò": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-nicolo"
 },
 "Francesco Maggiore": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-francesco-maggiore"
 },
 "Emanuele Pascali": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-emanuele-pascali"
 },
 "Spider Trovè": {
  "page": "Seconda Guerra degli Avengers",
  "anchor": "bio-spider-trove"
 },
 "Alex Spisso": {
  "page": "La Prima Guerra Pocchiana",
  "anchor": "bio-alex-spisso"
 },
 "Cheddar Mussolini": {
  "page": "La Prima Guerra Pocchiana",
  "anchor": "bio-cheddar-mussolini"
 },
 "Filippo Pascali": {
  "page": "La Prima Guerra Pocchiana",
  "anchor": "bio-filippo-pascali"
 },
 "Alice Sportella": {
  "page": "La Prima Guerra Pocchiana",
  "anchor": "bio-alice-sportella"
 },
 "Alessio Spisso": {
  "page": "Terza Guerra degli Avengers",
  "anchor": "bio-alessio-spisso"
 },
 "Pete Hegseth": {
  "page": "Terza Guerra degli Avengers",
  "anchor": "bio-pete-hegseth"
 },
 "Topus Maximus": {
  "page": "Topismo",
  "anchor": "bio-topus-maximus"
 },
 "La Fede": {
  "page": "Topismo",
  "anchor": "bio-la-fede"
 },
 "Zio di Sbost": {
  "page": "La caduta di Napoli",
  "anchor": "bio-zio-di-sbost"
 },
 "Elisa Sbost": {
  "page": "La caduta di Napoli",
  "anchor": "bio-elisa-sbost"
 },
 "Primo Clone dello Zio di Sbost": {
  "page": "La guerra delle Piante contro gli Zombi",
  "anchor": "bio-primo-clone-dello-zio-di-sbost"
 },
 "AleDoria": {
  "page": "Grande Spaccatura degli Sbost",
  "anchor": "bio-aledoria"
 },
 "Jacopo Martucci": {
  "page": "La Grande Partita tra le Fiamme",
  "anchor": "bio-jacopo-martucci"
 },
 "Bomber": {
  "page": "La Grande Partita tra le Fiamme",
  "anchor": "bio-bomber"
 },
 "Renna": {
  "page": "La Grande Partita tra le Fiamme",
  "anchor": "bio-renna"
 },
 "Deta": {
  "page": "La Grande Partita tra le Fiamme",
  "anchor": "bio-deta"
 },
 "Giulia Donno": {
  "page": "La Grande Partita tra le Fiamme",
  "anchor": "bio-giulia-donno"
 },
 "Massimo Floris": {
  "page": "Prima Comunione di Zella",
  "anchor": "bio-massimo-floris"
 },
 "Rashid": {
  "page": "Avventure di Alessio e Rashid in India",
  "anchor": "bio-rashid"
 },
 "MariaTeresa Friolo": {
  "page": "Avventure di Alessio e Rashid in India",
  "anchor": "bio-mariateresa-friolo"
 },
 "Luca Pascali": {
  "page": "Giachele",
  "anchor": "bio-luca-pascali"
 },
 "Figli di Filippo": {
  "page": "Giachele",
  "anchor": "bio-figli-di-filippo"
 },
 "Il Ciciliano": {
  "page": "La Caccia a Giachele",
  "anchor": "bio-il-ciciliano"
 },
 "Greta Rizzo": {
  "page": "La Caccia a Giachele",
  "anchor": "bio-greta-rizzo"
 },
 "Nestola": {
  "page": "La Sfida di Nestola al Topismo",
  "anchor": "bio-nestola"
 },
 "Carola la Rosa": {
  "page": "Isola di Flavio",
  "anchor": "bio-carola-la-rosa"
 },
 "Carola Feudo": {
  "page": "Isola di Flavio",
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
  "page": "Gli esordi di Tom and Jerry",
  "anchor": "bio-tommaso-pascali"
 },
 "Massimiliano Dimitri": {
  "page": "Gli esordi di Tom and Jerry",
  "anchor": "bio-massimiliano-dimitri"
 },
 "Jerry": {
  "page": "Gli esordi di Tom and Jerry",
  "anchor": "bio-jerry"
 },
 "Nicolò Donno": {
  "page": "Vandalismo Democratico di Serrano",
  "anchor": "bio-nicolo-donno"
 },
 "Antonio Cazzato": {
  "page": "Vandalismo Democratico di Serrano",
  "anchor": "bio-antonio-cazzato"
 },
 "Maria Grazia Calò": {
  "page": "Vandalismo Democratico di Serrano",
  "anchor": "bio-maria-grazia-calo"
 },
 "Andrea Sponziello": {
  "page": "Vandalismo Democratico di Serrano",
  "anchor": "bio-andrea-sponziello"
 },
 "Flavia Aventeggiato": {
  "page": "Vandalismo Democratico di Serrano",
  "anchor": "bio-flavia-aventeggiato"
 },
 "Zella (Avengers)": {
  "page": "Prima Guerra degli Avengers",
  "anchor": "bio-zella"
 },
 "Proclamazione Regno d'Italia": {
  "page": "Regno d'Italia",
  "anchor": null
 },
 "Referendum Unificazione 230 dM": {
  "page": "Unificazione Italiana (231 dM)",
  "anchor": null
 }
};
