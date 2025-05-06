@echo off
cd /d %~dp0

echo Starting all 10 Node-RED instances...

for /l %%i in (0,1,9) do (
  set /a PORT=1880 + %%i
  echo Starting instance %%i on port !PORT!
  start "" node node_modules\node-red\red.js -s multi-launcher\settings\settings_%%i.js
)
