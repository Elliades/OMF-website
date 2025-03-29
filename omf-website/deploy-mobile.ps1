# PowerShell script for building and deploying OMF Website with mobile responsiveness
Write-Host "Building and deploying OMF Website with mobile optimizations..." -ForegroundColor Cyan

# Set environment variables
$env:NODE_ENV = "production"

# Navigate to correct directory (if script is run from parent folder)
$scriptPath = $MyInvocation.MyCommand.Path
$scriptDir = Split-Path $scriptPath
$currentDir = Get-Location
if (-not $currentDir.Path.EndsWith("omf-website")) {
    Write-Host "Navigating to omf-website directory..." -ForegroundColor Yellow
    cd $scriptDir
}

# Build the project without linting
Write-Host "Building Next.js project (skipping lint)..." -ForegroundColor Green
npm run build-no-lint

# Check if build was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Fix errors and try again." -ForegroundColor Red
    exit 1
}

# Deploy to Firebase
Write-Host "Deploying to Firebase..." -ForegroundColor Green
firebase deploy --only hosting

# Check if deploy was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed! Check Firebase configuration." -ForegroundColor Red
    exit 1
}

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Site is now live at https://omf-website-48649.web.app" -ForegroundColor Cyan
Write-Host "Mobile responsiveness improvements have been deployed." -ForegroundColor Cyan

# Keep the window open
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")