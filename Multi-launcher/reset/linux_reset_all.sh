#!/bin/bash
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)

echo "Resetting all Node-RED instances to a clean state..."
node "$SCRIPT_DIR/reset_instances.js"
STATUS=$?

if [ $STATUS -ne 0 ]; then
  echo "Reset failed."
  exit $STATUS
fi

echo "Reset completed successfully."
