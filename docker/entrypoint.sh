#!/bin/sh
# docker/entrypoint.sh
#
# Generates /usr/share/nginx/html/config.js and /tmp/api-proxy-location.conf
# at container startup, injecting runtime environment variables.
#
# Environment variables consumed:
#   API_BASE_URL  — Full Petstore API base URL (default: DEV deployment).
#                   Used by the nginx reverse proxy; the browser always sees
#                   a relative /api/v1 path (same-origin, no CORS needed).
#   API_KEY       — Optional. If set, injected as the api_key header on every
#                   proxied request (server-side only — never sent to the browser).
#
# Usage (Dockerfile CMD or compose entrypoint):
#   entrypoint: ["/docker-entrypoint.sh"]

set -e

# Full backend URL used by nginx reverse-proxy (never sent to the browser).
BACKEND="${API_BASE_URL:-https://petstore-api-dev.ramon-alcantara.work/api/v1}"
BACKEND="${BACKEND%/}"  # strip any trailing slash

# Extract scheme://host (no path) for the nginx resolver+variable proxy trick.
# When proxy_pass receives a variable with no URI path, nginx passes the original
# request URI unchanged — so GET /api/v1/pet/... correctly hits backend /api/v1/pet/...
API_HOST=$(echo "$BACKEND" | sed 's|/api.*||')
API_HOSTNAME=$(echo "$API_HOST" | sed 's|https\{0,1\}://||')

# 1. config.js — always relative so the browser hits nginx (avoids CORS).
#    The actual backend target lives only in the nginx proxy conf below.
#    Use VITE_API_BASE_URL if set, else API_BASE_URL, else default to /api/v1
FRONTEND_API_BASE_URL="${VITE_API_BASE_URL:-${API_BASE_URL:-/api/v1}}"
FRONTEND_API_BASE_URL="${FRONTEND_API_BASE_URL%/}" # strip trailing slash
cat > /usr/share/nginx/html/config.js <<EOF
/* Runtime configuration – generated at container startup. Do not edit. */
window.__RUNTIME_CONFIG__ = {
  API_BASE_URL: "${FRONTEND_API_BASE_URL}"
};
EOF
echo "[entrypoint] config.js written — API_BASE_URL=${FRONTEND_API_BASE_URL} (proxied -> ${BACKEND})"

# 2. nginx proxy location — generated with the runtime backend URL.
#    For host.docker.internal / localhost we use a static proxy_pass because
#    nginx resolver directives cannot resolve Docker's special host aliases.
#    For normal DNS hosts, keep variable+resolver behavior for per-request DNS.
#    Backslash-escaped $ are nginx variables; unescaped ${...} are shell variables.

# Build optional api_key header line (server-side only — never in config.js).
if [ -n "${API_KEY:-}" ]; then
  API_KEY_HEADER="    proxy_set_header   x-api-key         \"${API_KEY}\";"
  echo "[entrypoint] API_KEY detected — will inject api_key header in proxy requests"
else
  API_KEY_HEADER=""
  echo "[entrypoint] API_KEY not set — requests proxied without api_key header"
fi

case "${API_HOSTNAME}" in
  host.docker.internal*|localhost*|127.0.0.1*)
  cat > /tmp/api-proxy-location.conf <<NGINX_EOF
location /api/v1/ {
  proxy_pass         ${API_HOST};
  proxy_http_version 1.1;
  proxy_ssl_server_name on;
  proxy_set_header   Host              "${API_HOSTNAME}";
  proxy_set_header   X-Real-IP         \$remote_addr;
  proxy_set_header   X-Forwarded-For   \$proxy_add_x_forwarded_for;
  proxy_set_header   X-Forwarded-Proto \$scheme;
${API_KEY_HEADER}
  proxy_pass_header  Cache-Control;
}
NGINX_EOF
  ;;
  *)
  cat > /tmp/api-proxy-location.conf <<NGINX_EOF
location /api/v1/ {
  resolver           1.1.1.1 8.8.8.8 valid=30s ipv6=off;
  set                \$api_backend "${API_HOST}";
  proxy_pass         \$api_backend;
  proxy_http_version 1.1;
  proxy_ssl_server_name on;
  proxy_set_header   Host              "${API_HOSTNAME}";
  proxy_set_header   X-Real-IP         \$remote_addr;
  proxy_set_header   X-Forwarded-For   \$proxy_add_x_forwarded_for;
  proxy_set_header   X-Forwarded-Proto \$scheme;
${API_KEY_HEADER}
  proxy_pass_header  Cache-Control;
}
NGINX_EOF
  ;;
esac
echo "[entrypoint] nginx proxy configured — /api/v1/ -> ${BACKEND}/ (host: ${API_HOSTNAME})"

# Hand off to nginx
exec nginx -g "daemon off;"
