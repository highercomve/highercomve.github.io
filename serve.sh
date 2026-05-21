#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-${PORT:-8080}}"
cd "$(dirname "$0")"

echo "Serving http://localhost:${PORT}"
exec python3 -m http.server "${PORT}" --bind 127.0.0.1
