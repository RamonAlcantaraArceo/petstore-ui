#!/usr/bin/env bash
set -euo pipefail

# Run: ./scripts/linux-to_darwin.sh tests/visual/storybook.visual.spec.ts-snapshots

ROOT_DIR="${1:-.}"

find "$ROOT_DIR" -type f -name '*linux*' -print0 | while IFS= read -r -d '' src; do
  dir="$(dirname "$src")"
  base="$(basename "$src")"
  dest_base="${base//linux/darwin}"
  dest="$dir/$dest_base"

  # Skip if replacement did not change filename
  [[ "$base" == "$dest_base" ]] && continue

  cp -p "$src" "$dest"
  echo "Copied: $src -> $dest"
done