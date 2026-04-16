#!/bin/bash
BASE_DIR=$(cd "$(dirname "$0")/.." && pwd)
NODE_RED_SCRIPT="$BASE_DIR/node_modules/node-red/red.js"
SETTINGS_DIR="$BASE_DIR/Multi-launcher/settings"

if [ ! -f "$NODE_RED_SCRIPT" ]; then
  echo "Node-RED is not installed in this project yet."
  echo "Run npm install from the project root and try again."
  exit 1
fi

if [ ! -f "$SETTINGS_DIR/settings_0.js" ]; then
  echo "Instance settings not found. Generating them now..."
  node "$BASE_DIR/Multi-launcher/generate-instances.js" || exit 1
fi

for i in {0..9}
do
  echo "Starting Node-RED instance $i on port $((1990 + i))"
  node "$NODE_RED_SCRIPT" -s "$SETTINGS_DIR/settings_${i}.js" &
done
