#!/bin/bash
BASE_DIR=$(cd "$(dirname "$0")/.." && pwd)

for i in {0..9}
do
  echo "Starting Node-RED instance $i on port $((1880 + i))"
  node $BASE_DIR/node_modules/node-red/red.js -s $BASE_DIR/multi-launcher/settings/settings_$i.js &
done
