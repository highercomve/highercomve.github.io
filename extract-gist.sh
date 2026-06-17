#!/usr/bin/env bash
# Extract the two gist-backed files from assets/data.json (the single source of
# truth / offline fallback) so they can be pasted into the GitHub gist:
#   https://gist.github.com/highercomve/31b012276a7bd488f55ca74324b9faf1
#
# Usage: ./extract-gist.sh   ->   writes gist-files/{content,experience}.json
set -euo pipefail
cd "$(dirname "$0")"

out="gist-files"
mkdir -p "$out"

for f in content.json experience.json; do
  jq -er --arg f "$f" '.files[$f].content' assets/data.json | jq . > "$out/$f"
  echo "wrote $out/$f"
done
