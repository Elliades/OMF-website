@echo off
echo Starting OMF Website development server...

REM Try to kill any existing process on port 3280
powershell -Command "Get-Process -Id (Get-NetTCPConnection -LocalPort 3280 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue | Stop-Process -Force"

REM First try the default port
echo Trying port 3280...
npx next dev --port 3280

REM If that failed, try an alternative port
if %ERRORLEVEL% NEQ 0 (
  echo Port 3280 is in use. Trying port 3281...
  npx next dev --port 3281
)

REM If that also failed, try one more port
if %ERRORLEVEL% NEQ 0 (
  echo Port 3281 is also in use. Trying port 3282...
  npx next dev --port 3282
)

REM If all ports are busy, let Next.js pick a random port
if %ERRORLEVEL% NEQ 0 (
  echo All specified ports are in use. Letting Next.js choose a port...
  npx next dev
)

pause 