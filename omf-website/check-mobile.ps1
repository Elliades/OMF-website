# PowerShell script for checking mobile responsiveness
Write-Host "Starting OMF Website for mobile testing..." -ForegroundColor Cyan

# Navigate to correct directory (if script is run from parent folder)
$scriptPath = $MyInvocation.MyCommand.Path
$scriptDir = Split-Path $scriptPath
$currentDir = Get-Location
if (-not $currentDir.Path.EndsWith("omf-website")) {
    Write-Host "Navigating to omf-website directory..." -ForegroundColor Yellow
    cd $scriptDir
}

# Try different ports
$ports = @(3280, 3281, 3282, 3283, 3284, 3285)
$portFound = $false

foreach ($port in $ports) {
    $testPort = $true
    $connections = $null
    
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    } catch {
        $testPort = $false
    }
    
    if ($testPort -eq $false -or $connections -eq $null) {
        Write-Host "Starting mobile test mode on port $port..." -ForegroundColor Green
        Write-Host "Mobile Device Testing Guide:" -ForegroundColor Yellow
        Write-Host "1. Open Chrome DevTools (F12)" -ForegroundColor White
        Write-Host "2. Click the 'Toggle Device Toolbar' button (Ctrl+Shift+M)" -ForegroundColor White
        Write-Host "3. Select different mobile devices from the dropdown" -ForegroundColor White
        Write-Host "4. Test the responsive layout on various devices" -ForegroundColor White
        Write-Host "Common test devices: iPhone SE, iPhone 12 Pro, Pixel 5, Samsung Galaxy S20" -ForegroundColor White
        
        $portFound = $true
        npx next dev --port $port
        break
    } else {
        Write-Host "Port $port is already in use, trying another port..." -ForegroundColor Yellow
    }
}

if (-not $portFound) {
    Write-Host "All ports in range are in use. Please free up a port and try again." -ForegroundColor Red
    exit 1
}

Write-Host "Mobile testing server stopped." -ForegroundColor Yellow
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 