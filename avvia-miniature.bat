@echo off
cd /d "%~dp0"
echo Le miniature dei personaggi vengono create in automatico.
echo Lascia questa finestra aperta mentre aggiungi le foto in img\personaggi\
echo.
python genera-miniature.py --watch
pause
