# syntax=docker/dockerfile:1
# ---------------------------------------------------------------------------
# Stage 1 — build
# ---------------------------------------------------------------------------
# Pin to a specific bun minor so builds are reproducible; bump deliberately.
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app

ARG CI=true
ARG STORYBOOK_DISABLE_TELEMETRY=1
ARG DO_NOT_TRACK=1

ENV CI=${CI} \
    STORYBOOK_DISABLE_TELEMETRY=${STORYBOOK_DISABLE_TELEMETRY} \
    DO_NOT_TRACK=${DO_NOT_TRACK}

# Install dependencies first (maximises layer cache re-use).
# --ignore-scripts skips the postinstall that runs `playwright install --with-deps`
# — Playwright browsers are not needed in the build container.
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile --ignore-scripts

# Copy source and build all static outputs
COPY . .
RUN bun run build-storybook && bun run build-petstore

# ---------------------------------------------------------------------------
# Stage 2 — serve
# ---------------------------------------------------------------------------
# Pin to a specific nginx minor to keep the runtime image stable.
FROM nginx:1.27-alpine AS runner

# Remove default nginx welcome page and server config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Replace with the tracked, reviewed nginx config (includes security headers)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/conf.d/security-headers.conf

# Copy built outputs into the nginx document root:
#   /                  → public/ (homepage)
#   /storybook/        → storybook-static/
#   /petstore/         → petstore/ + petstore/dist/ (React SPA)
COPY --from=builder /app/public          /usr/share/nginx/html
COPY --from=builder /app/storybook-static /usr/share/nginx/html/storybook
COPY --from=builder /app/petstore        /usr/share/nginx/html/petstore

# Runtime entrypoint: generates config.js with API_BASE_URL before nginx starts
COPY docker/entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
