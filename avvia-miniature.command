#!/bin/bash
cd "$(dirname "$0")"
echo "Le miniature dei personaggi vengono create in automatico."
echo "Lascia questa finestra aperta mentre aggiungi le foto in img/personaggi/"
python3 genera-miniature.py --watch
