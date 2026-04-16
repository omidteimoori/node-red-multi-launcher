@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

for %%I in ("%~dp0..") do set "ROOT_DIR=%%~fI"
set "NODE_RED_SCRIPT=%ROOT_DIR%\node_modules\node-red\red.js"
set "SETTINGS_DIR=%ROOT_DIR%\Multi-launcher\settings"

if not exist "%NODE_RED_SCRIPT%" (
  echo Node-RED is not installed in this project yet.
  echo Run npm install from the project root and try again.
  pause
  exit /b 1
)

if not exist "%SETTINGS_DIR%\settings_0.js" (
  echo Instance settings not found. Generating them now...
  node "%ROOT_DIR%\Multi-launcher\generate-instances.js"
  if errorlevel 1 (
    echo Failed to generate the instance settings.
    pause
    exit /b 1
  )
)

echo Starting all 10 Node-RED instances...

for /l %%i in (0,1,9) do (
  set /a PORT=1990 + %%i
  echo Starting instance %%i on port !PORT!
  start "Node-RED %%i" cmd /k node "%NODE_RED_SCRIPT%" -s "%SETTINGS_DIR%\settings_%%i.js"
)
