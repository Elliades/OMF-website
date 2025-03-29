# PowerShell deployment script for OMF Website that handles all component errors
Write-Host "Building and deploying OMF Website..." -ForegroundColor Cyan

# Navigate to correct directory (if script is run from parent folder)
$scriptPath = $MyInvocation.MyCommand.Path
$scriptDir = Split-Path $scriptPath
$currentDir = Get-Location
if (-not $currentDir.Path.EndsWith("omf-website")) {
    Write-Host "Navigating to omf-website directory..." -ForegroundColor Yellow
    cd $scriptDir
}

# Set environment variables
$env:NODE_ENV = "production"

# Check for existing builds
if (Test-Path -Path ".next") {
    Write-Host "Removing existing .next directory to clean previous builds..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .next
}

if (Test-Path -Path "out") {
    Write-Host "Removing existing out directory to clean previous builds..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force out
}

# Install dependencies if node_modules doesn't exist or is incomplete
if (-not (Test-Path -Path "node_modules/react")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
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
Write-Host "All component and navigation fixes have been deployed." -ForegroundColor Green

# Keep the window open
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")