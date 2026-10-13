#!/usr/bin/env python3
"""
Genera le miniature per i tooltip dei personaggi.

Prende ogni immagine in img/personaggi/ e crea la versione leggera in
img/personaggi/thumb/<nome>.jpg (400x364, ~30 KB), quella che il sito mostra
passando il mouse sui nomi.

Uso:
    python genera-miniature.py            crea solo le miniature mancanti o vecchie, poi esce
    python genera-miniature.py --watch    resta in ascolto: appena metti una foto nella
                                          cartella, la miniatura viene creata da sola
    python genera-miniature.py --tutte    rifà tutte le miniature da zero

Serve Pillow:  pip install pillow
"""
import os
import sys
import time

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Manca Pillow. Installalo con:  pip install pillow")

QUI = os.path.dirname(os.path.abspath(__file__))
CARTELLA = os.path.join(QUI, "img", "personaggi")
THUMB = os.path.join(CARTELLA, "thumb")
LARGHEZZA, ALTEZZA = 400, 364
ESTENSIONI = (".png", ".jpg", ".jpeg", ".webp", ".gif")


def immagini():
    if not os.path.isdir(CARTELLA):
        return []
    return [f for f in sorted(os.listdir(CARTELLA))
            if os.path.isfile(os.path.join(CARTELLA, f)) and f.lower().endswith(ESTENSIONI)]


def percorso_miniatura(nome_file):
    base = os.path.splitext(nome_file)[0]
    return os.path.join(THUMB, base + ".jpg")


def da_fare(nome_file, tutte=False):
    mini = percorso_miniatura(nome_file)
    if tutte or not os.path.exists(mini):
        return True
    return os.path.getmtime(os.path.join(CARTELLA, nome_file)) > os.path.getmtime(mini)


def crea(nome_file):
    os.makedirs(THUMB, exist_ok=True)
    origine = os.path.join(CARTELLA, nome_file)
    im = ImageOps.exif_transpose(Image.open(origine))
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        fondo = Image.new("RGB", im.size, (255, 255, 255))
        fondo.paste(im, mask=im.split()[-1])
        im = fondo
    else:
        im = im.convert("RGB")
    im = ImageOps.fit(im, (LARGHEZZA, ALTEZZA), Image.LANCZOS, centering=(0.5, 0.5))
    mini = percorso_miniatura(nome_file)
    im.save(mini, "JPEG", quality=80, optimize=True, progressive=True)
    print("  creata:", os.path.relpath(mini, QUI), f"({os.path.getsize(mini) // 1024} KB)")


def file_stabile(nome_file):
    """True quando la copia del file è finita (la dimensione non cambia più)."""
    p = os.path.join(CARTELLA, nome_file)
    try:
        a = os.path.getsize(p)
        time.sleep(0.6)
        return a > 0 and a == os.path.getsize(p)
    except OSError:
        return False


def passata(tutte=False):
    n = 0
    for f in immagini():
        if da_fare(f, tutte) and file_stabile(f):
            try:
                crea(f)
                n += 1
            except Exception as e:
                print("  ERRORE su", f, "->", e)
    return n


def main():
    tutte = "--tutte" in sys.argv
    if "--watch" in sys.argv:
        print("In ascolto su img/personaggi/ ... (Ctrl+C per fermare)")
        passata(tutte)
        try:
            while True:
                passata()
                time.sleep(2)
        except KeyboardInterrupt:
            print("\nFermato.")
    else:
        n = passata(tutte)
        print(f"Fatto: {n} miniature create." if n else "Tutte le miniature sono già aggiornate.")


if __name__ == "__main__":
    main()
