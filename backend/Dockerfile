# syntax=docker/dockerfile:1

# =========================
# BUILD
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

COPY backend/package.json backend/package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
  npm ci

COPY backend/ ./

RUN npm run build


# =========================
# PRODUCTION
# =========================
FROM node:20-alpine AS production

RUN apk add --no-cache curl netcat-openbsd

WORKDIR /app

ENV NODE_ENV=production
ENV TYPEORM_USE_DIST=1

COPY backend/package.json backend/package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev

COPY --from=builder /app/dist ./dist

COPY deploy/scripts/backend-entrypoint.sh /entrypoint.sh

RUN sed -i 's/\r$//' /entrypoint.sh \
  && chmod +x /entrypoint.sh \
  && mkdir -p /app/uploads \
  && chown -R node:node /app

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:3000/api/health" || exit 1

ENTRYPOINT ["/entrypoint.sh"]
