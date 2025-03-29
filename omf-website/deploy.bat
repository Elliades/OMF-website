@echo off
echo Building and deploying OMF Website...

:: Set environment variables
set "NODE_ENV=production"

:: Build the project without linting
echo Building Next.js project (skipping lint)...
call npm run build-no-lint

:: Deploy to Firebase
echo Deploying to Firebase...
call firebase deploy --only hosting

echo Deployment complete!
echo Site is now live at https://omf-website-48649.web.app
pause 