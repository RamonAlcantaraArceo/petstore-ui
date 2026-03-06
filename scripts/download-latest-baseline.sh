#!/usr/bin/env bash
set -euo pipefail

TARGET_ENV="${1:-${TARGET_ENV:-dev}}"
BUCKET="${S3_VISUAL_REPORTS_BUCKET:-petstore-ui-visual-reports-706503910195-us-east-1}"
DEST_DIR="${DEST_DIR:-tests/visual/storybook.visual.spec.ts-snapshots}"
PREFIX="${PREFIX:-${TARGET_ENV}/visual-baseline/storybook.visual.spec.ts-snapshots/latest}"

echo "Downloading baseline snapshots"
echo "  bucket: ${BUCKET}"
echo "  env:    ${TARGET_ENV}"
echo "  source: s3://${BUCKET}/${PREFIX}/"
echo "  dest:   ${DEST_DIR}/"

if ! aws s3 ls "s3://${BUCKET}/${PREFIX}/" --no-cli-pager >/dev/null 2>&1; then
  echo "No baseline snapshots found at s3://${BUCKET}/${PREFIX}/"
  echo "Run baseline publish first for env '${TARGET_ENV}'."
  exit 1
fi

mkdir -p "${DEST_DIR}"
aws s3 sync "s3://${BUCKET}/${PREFIX}/" "${DEST_DIR}/" --delete --no-cli-pager

echo "Baseline download complete."
