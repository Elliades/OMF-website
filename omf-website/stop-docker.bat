@echo off
echo Stopping OMF Vitrine Docker container...
cd /d %~dp0
docker-compose down
echo.
echo OMF Vitrine website has been stopped. 