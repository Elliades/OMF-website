@echo off
echo Building and starting OMF Vitrine Docker container...
cd /d %~dp0
docker-compose up -d
echo.
echo OMF Vitrine website is now running at http://localhost:3280
echo To stop the server, run stop-docker.bat 