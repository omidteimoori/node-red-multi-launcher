@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo Resetting all Node-RED instances to a clean state...
node reset_instances.js

if errorlevel 1 (
  echo Reset failed.
  pause
  exit /b 1
)

echo Reset completed successfully.
pause
