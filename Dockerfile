# syntax=docker/dockerfile:1
# ---------------------------------------------------------------------------
# Stage 1 — build
# ---------------------------------------------------------------------------
FROM oven/bun:1 AS builder

WORKDIR /app

ARG CI=true
ARG STORYBOOK_DISABLE_TELEMETRY=1
ARG DO_NOT_TRACK=1

ENV CI=${CI}
ENV STORYBOOK_DISABLE_TELEMETRY=${STORYBOOK_DISABLE_TELEMETRY}
ENV DO_NOT_TRACK=${DO_NOT_TRACK}

# Install dependencies first (layer-cache friendly)
COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

# Copy source and build Storybook static site
COPY . .
RUN bun run build-storybook

# ---------------------------------------------------------------------------
# Stage 2 — serve
# ---------------------------------------------------------------------------
FROM nginx:alpine AS runner

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built Storybook static output
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Lightweight nginx config for SPA routing
RUN printf 'server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
