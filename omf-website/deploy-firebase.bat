@echo off
echo Building and deploying OMF Website to Firebase...

REM Clean previous builds
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

REM Install dependencies if needed
call npm install

REM Build the project
call npm run build

REM Deploy to Firebase
call firebase deploy --only hosting

echo Deployment complete!
pause