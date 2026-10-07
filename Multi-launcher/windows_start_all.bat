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

set /a INSTANCE_COUNT=0
:launch_loop
if not exist "%SETTINGS_DIR%\settings_!INSTANCE_COUNT!.js" goto launch_done

set /a PORT=1990 + !INSTANCE_COUNT!
echo Starting instance !INSTANCE_COUNT! on port !PORT!
start "Node-RED !INSTANCE_COUNT!" cmd /k node "%NODE_RED_SCRIPT%" -s "%SETTINGS_DIR%\settings_!INSTANCE_COUNT!.js"
set /a INSTANCE_COUNT+=1
goto launch_loop

:launch_done
if !INSTANCE_COUNT! EQU 0 (
  echo No generated instance settings were found in "%SETTINGS_DIR%".
  pause
  exit /b 1
)

echo Launched !INSTANCE_COUNT! Node-RED instance(s).
