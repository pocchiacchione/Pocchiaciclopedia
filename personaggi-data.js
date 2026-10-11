// ══════════════════════════════════════════════════════
//  DATI PERSONAGGI — per il tooltip con anteprima immagine
// ══════════════════════════════════════════════════════
//
// Come funziona:
// ogni volta che uno dei nomi qui sotto compare (scritto esattamente
// così) nel testo di un articolo, wiki-script.js lo trasforma
// automaticamente in un elemento su cui passare il mouse (o toccare,
// da smartphone) per vedere l'immagine collegata. I nomi che sono già
// dei link non vengono toccati.
//
// Per aggiungere un personaggio:
//   1. aggiungi una riga qui sotto: "Nome esatto": "img/personaggi/file.jpg",
//   2. metti l'immagine nel percorso indicato.
//
// Se un nome è contenuto in un altro (es. "Mario" dentro "Mario Rossi")
// viene riconosciuto sempre il nome più lungo.
// Se l'estensione non corrisponde al file reale, il tooltip prova da solo
// png/jpg/jpeg/webp/gif.

const PERSONAGGI_IMG = {
  "Alessio Spisso": "img/personaggi/alessio.jpg",
  "Filippo Pascali": "img/personaggi/filippo.jpg",
  "Anna Pocchia": "img/personaggi/anna.jpg",
  "Gianluca Pascali": "img/personaggi/gianluca.jpg",
  "Riccardo Pascali": "img/personaggi/riccardo.jpg",
  "Morello": "img/personaggi/morello.jpg",
  "Ludovico Pio Tommasi": "img/personaggi/ludovico.jpg",
  "VitoCarlo Tommasi": "img/personaggi/vitocarlo.jpg",
  "Topus Maximus": "img/personaggi/topus.jpg",
  "Serrano": "img/personaggi/serrano_volante.png",
  "Cheddar Mussolini": "img/personaggi/cheddar.jpg",
  "Sal da Spicci": "img/personaggi/sal_da_spicci.jpg",
  "Sal da Vinci": "img/personaggi/sal_da_vinci.jpg",
  "Avengers": "img/personaggi/avengers.jpg",
  "Iron Spisso Man": "img/personaggi/iron_spisso_man.png",
  "Valerio Mozzarella": "img/personaggi/valerio.png",
  "Nicolò": "img/personaggi/nicolo.jpeg",
  "Spider Trovè": "img/personaggi/spider_trove.png",
  "Emanuele Pascali": "img/personaggi/emanuele.png",
  "Francesco Maggiore": "img/personaggi/francesco.png",
  "Spisshor": "img/personaggi/spisshor.png",
  "Nigeria Spartiana": "img/personaggi/nigeria_flag.jpg",
  "Zella": "img/personaggi/zella.jpg",
  "La Fede": "img/personaggi/la_fede.jpg",
  "Alice Sportella": "img/personaggi/alice_sportella.jpg",
  "Figli di Filippo": "img/personaggi/figli_filippo.jpg",
  "Raggio Nero": "img/personaggi/raggio_nero.jpg",
  "Ilaria Spisso": "img/personaggi/ilaria_spisso.jpg",
  "Zio di Sbost": "img/personaggi/zio_di_sbost.jpeg",
  "Terza Guerra degli Avengers": "img/personaggi/serrano_prima.png",
  "La guerra delle Piante contro gli Zombi": "img/personaggi/piante_vs_zombi.jpeg",
  "Primo Clone dello Zio di Sbost": "img/personaggi/primo_clone.png",
  "Mancarella": "img/personaggi/mancarella.jpeg",
  "La Cantina": "img/personaggi/bandiera_cantina.jpg",
  "AleDoria": "img/personaggi/aledoria.jpeg",
  "Elisa Sbost": "img/personaggi/elisa_sbost.jpeg",
  "Massimo Floris": "img/personaggi/massimo_floris.png",
  "Prima Comunione di Zella": "img/personaggi/zella_2.jpeg",
  "Repubblica di Serrano": "img/personaggi/repubblica-serrano.jpg",
  "I Puma": "img/personaggi/puma.png",
  "Antonio Cazzato": "img/personaggi/cazzy.jpg",
  "Flavia Aventeggiato": "img/personaggi/aventeggiato.png",
  "Protettorato del Clan Spisso": "img/personaggi/clan.jpg",
  "Stato Topista di Serrano": "img/personaggi/serrano-top.jpg",
  "Stato Topista Unito": "img/personaggi/serrano-top-dit.jpg",
  "Ducato di Serrano": "img/personaggi/alessio_spisso_duca.jpg",
  "Principato di Napoli (Età dell'Oro)": "img/personaggi/bandiera_napoli_oro.jpg",
  "Napoli Sporca": "img/personaggi/bandiera_napoli_sporca.jpg",
  "Terzo Principato di Napoli": "img/personaggi/bandiera_napoli_terzo.jpg",

  // Soprannomi (stessa immagine del personaggio):
  "Rick Brick": "img/personaggi/riccardo.jpg",
  "Il Pocchia": "img/personaggi/gianluca.jpg",
  "Capitan Bianco": "img/personaggi/valerio.png",
  "Strega Cheddar": "img/personaggi/cheddar.jpg",
  "Alessio Spisso²": "img/personaggi/alessio.jpg",
  "Charlie Sbirk": "img/personaggi/primo_clone.png",
  "Flavio Sbost": "img/personaggi/zio_di_sbost.jpeg",
  "Don Massimo Floris": "img/personaggi/massimo_floris.png",
  "Donna delle Torte": "img/personaggi/ilaria_spisso.jpg",

  // Aggiungi qui i prossimi personaggi:
  // "Nome Cognome": "img/personaggi/nome-cognome.jpg",
};

// Pagine che citano un'immagine non ancora caricata nel repository
// (da aggiungere in img/personaggi/ o img/pagine/ e poi inserire sopra):
//   Napoli -> napoli_generica.jpg
//   MariaTeresa Friolo -> maria.jpg
//   Pierpaolo -> pierpaolo.jpg
//   Giovanni Zecca -> giovanni_zecca.jpg
//   Pianeta Zecca -> pianeta_zecca.png
//   Jacopo Martucci -> jacopo_martucci.jpg
//   Martano -> martano.jpg
//   Bomber -> bomber.jpg
//   Renna -> renna.jpg
//   Deta -> deta.jpg
//   The United Kingdom of Great Britain and France -> ukfr.jpg
//   Anna Colella -> anna_colella.jpg
//   Maria Marzo -> maria_marzo.jpg
//   Calogiuri -> calogiuri.jpg
//   Regno d'Italia -> ri.jpg
//   Partito Democratico di Castri (Charlie Sbirk) -> charlie_sbirk_partito.jpg
//   Alleanza per la Verità -> morello_sbost_alliance.jpg
//   Partito Democratico dei Puma -> puma_partito.png
//   Rivolta di Castri -> rivolta_castri.jpg
//   Processo a Charlie Sbirk -> processo_charlie.jpg
//   Carola la Rosa -> rucola.jpg
//   Carola Feudo -> rocmambo.jpg
//   Nestola -> nestola.jpg
//   Il Ciciliano -> ciciliano.jpg
//   Luca Pascali -> luca_pascali.jpg
//   Greta Rizzo -> greta_rizzo.jpg
//   Tommaso Pascali -> tommaso.jpg
//   Massimiliano Dimitri -> massimiliano.jpg
//   Jerry -> jerry.jpg
//   Tom and Max -> tomandmax.jpg
//   Tom and Jerry -> tomandjerry.jpg
//   Nicolò Donno -> ND.jpg
//   Maria Grazia Calò -> MG.jpg
//   Andrea Sponziello -> sponziello.jpg
//   Unificazione Italiana (231 dM) -> unificazione_italiana.jpg
//   Repubblica Italiana -> repi.jpg
