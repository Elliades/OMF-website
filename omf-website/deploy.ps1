# PowerShell deployment script
Write-Host "Deploying OMF Website to Firebase..." -ForegroundColor Cyan

# Navigate to the project directory
Set-Location -Path $PSScriptRoot

# Build the project (no linting)
Write-Host "Building Next.js project (skipping lint)..." -ForegroundColor Yellow
npm run build-no-lint

# Deploy to Firebase
Write-Host "Deploying to Firebase..." -ForegroundColor Green
firebase deploy --only hosting

Write-Host "Deployment complete!" -ForegroundColor Cyan
Write-Host "Site is now live at https://omf-website-48649.web.app" -ForegroundColor Green
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 