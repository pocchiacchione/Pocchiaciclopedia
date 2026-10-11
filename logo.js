  const variantiLogo = ["img/logo.jpg", "img/personaggi/morello.jpg", "img/personaggi/filippo.jpg", "img/personaggi/alessio.jpg", "img/personaggi/ludovico.jpg"];
  const i = Math.floor(Math.random() * variantiLogo.length);
  const imgLogo = document.getElementById('logo-dinamico');
  
  if (imgLogo) {
    imgLogo.src = variantiLogo[i];
    // Aggiungi questo per debuggare: premi F12 nel browser e vedrai se scrive
    console.log("Immagine cambiata in: " + variantiLogo[i]);
  }
