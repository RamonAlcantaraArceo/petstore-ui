#!/usr/bin/env bash
set -euo pipefail

TARGET_ENV="${1:-${TARGET_ENV:-dev}}"
BUCKET="${S3_VISUAL_REPORTS_BUCKET:-petstore-ui-visual-reports-706503910195-us-east-1}"
OUT_ROOT="${OUT_ROOT:-tmp/s3-visual}"
PORT="${PORT:-4173}"
NO_SERVER="${NO_SERVER:-0}"

REPORT_PREFIX="${REPORT_PREFIX:-${TARGET_ENV}/visual-report/latest}"
BASELINE_PREFIX="${BASELINE_PREFIX:-${TARGET_ENV}/visual-baseline/storybook.visual.spec.ts-snapshots/latest}"

REPORT_DIR="${OUT_ROOT}/${TARGET_ENV}/report"
BASELINE_DIR="${OUT_ROOT}/${TARGET_ENV}/baseline"

mkdir -p "${REPORT_DIR}" "${BASELINE_DIR}"

echo "Syncing report from s3://${BUCKET}/${REPORT_PREFIX}/"
aws s3 sync "s3://${BUCKET}/${REPORT_PREFIX}/" "${REPORT_DIR}/" --no-cli-pager

echo "Syncing baseline from s3://${BUCKET}/${BASELINE_PREFIX}/"
if aws s3 ls "s3://${BUCKET}/${BASELINE_PREFIX}/" --no-cli-pager >/dev/null 2>&1; then
  aws s3 sync "s3://${BUCKET}/${BASELINE_PREFIX}/" "${BASELINE_DIR}/" --no-cli-pager
else
  echo "No baseline found at s3://${BUCKET}/${BASELINE_PREFIX}/"
fi

echo "Report local path: ${REPORT_DIR}/index.html"
echo "Baseline local path: ${BASELINE_DIR}/"

if [[ "${NO_SERVER}" == "1" ]]; then
  exit 0
fi

echo "Starting local preview server on http://localhost:${PORT}/index.html"
python3 -m http.server "${PORT}" --directory "${REPORT_DIR}"
