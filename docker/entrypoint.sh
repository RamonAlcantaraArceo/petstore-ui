#!/bin/sh
# docker/entrypoint.sh
#
# Generates /usr/share/nginx/html/config.js and /tmp/api-proxy-location.conf
# at container startup, injecting runtime environment variables.
#
# Environment variables consumed:
#   API_PROXY_TARGET — Full backend URL used by the nginx reverse proxy.
#                      Default: DEV deployment. The browser always sees
#                      a relative /api/v1 path (same-origin, no CORS needed).
#                      Example: https://petstore-api-dev.ramon-alcantara.work/api/v1
#   API_BASE_URL     — Browser-facing API path written into config.js.
#                      Default: /api/v1. Keep this relative to avoid CORS.
#   API_KEY          — Optional. If set, injected as the x-api-key header on every
#                      proxied request (server-side only — never sent to the browser).
#
# Usage (Dockerfile CMD or compose entrypoint):
#   entrypoint: ["/docker-entrypoint.sh"]

set -e

# Canonical default backend URL for this entrypoint script.
# Keep this value aligned with the application's default API backend in the
# other codepaths called out by CodeQL (for example apiClient.ts and
# preview-server.ts) to avoid configuration drift.
DEFAULT_API_PROXY_TARGET="https://petstore-api-dev.ramon-alcantara.work/api/v1"

# Full backend URL used by nginx reverse-proxy (never sent to the browser).
BACKEND_RAW="${API_PROXY_TARGET:-$DEFAULT_API_PROXY_TARGET}"
BACKEND_RAW="${BACKEND_RAW%/}"  # strip any trailing slash

# In containers, localhost/127.0.0.1 points to the container itself, not the host.
# Rewrite those hosts so local host services remain reachable.
BACKEND=$(echo "$BACKEND_RAW" | sed 's|://localhost|://host.docker.internal|; s|://127.0.0.1|://host.docker.internal|')
if [ "$BACKEND" != "$BACKEND_RAW" ]; then
  echo "[entrypoint] API_PROXY_TARGET used localhost/127.0.0.1; rewritten to ${BACKEND} for container networking"
fi

# Extract scheme://host (no path) for the nginx resolver+variable proxy trick.
# When proxy_pass receives a variable with no URI path, nginx passes the original
# request URI unchanged — so GET /api/v1/pet/... correctly hits backend /api/v1/pet/...
API_HOST=$(echo "$BACKEND" | sed 's|/api.*||')
API_HOSTNAME=$(echo "$API_HOST" | sed 's|https\{0,1\}://||')

# 1. config.js — always relative so the browser hits nginx (avoids CORS).
#    The actual backend target lives only in the nginx proxy conf below.
FRONTEND_API_BASE_URL="${API_BASE_URL:-/api/v1}"
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

# Build optional x-api-key header line (server-side only — never in config.js).
if [ -n "${API_KEY:-}" ]; then
  API_KEY_HEADER="    proxy_set_header   x-api-key         \"${API_KEY}\";"
  echo "[entrypoint] API_KEY detected — will inject x-api-key header in proxy requests"
else
  API_KEY_HEADER=""
  echo "[entrypoint] API_KEY not set — requests proxied without x-api-key header"
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
