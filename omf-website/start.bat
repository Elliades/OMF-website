@echo off
echo Starting OMF Vitrine development server on port 3280...
cd /d %~dp0
npm run dev
echo.
echo If the server doesn't start automatically, visit http://localhost:3280 in your browser.