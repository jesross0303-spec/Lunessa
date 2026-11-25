@echo off
title BEAUTE CRM - Jesmary Rossell
cls
echo ==========================================================
echo       BEAUTE - SOFTWARE CRM Y TIENDA ONLINE
echo       Directora: Jesmary Rossell
echo       Contacto: 3134880917
echo ==========================================================
echo.
echo Iniciando aplicacion en el navegador...
echo.

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python server.py
) else (
    echo Python no detectado en el PATH directo. Abriendo index.html...
    start index.html
)

pause
