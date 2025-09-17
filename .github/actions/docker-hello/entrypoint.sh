#!/usr/bin/env bash
set -euo pipefail
NAME="${1:-world}"
MSG="🐳 Hello, ${NAME} (from Docker action)!"
echo "${MSG}"
# Set an output (GH parses this format in Docker actions)
echo "message=${MSG}" >> "$GITHUB_OUTPUT"
