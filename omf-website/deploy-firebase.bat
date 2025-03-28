@echo off
echo Deploying to Firebase...

:: Deploy to Firebase
call firebase deploy --only hosting

echo Deployment complete!
echo Site is now live at https://omf-website-48649.web.app
pause 