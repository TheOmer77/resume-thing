FROM node:20.16.0-alpine3.20

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates \
  ttf-freefont && \ corepack enable pnpm && pnpm install && \
  # Fix EACCES: permission denied, open '/app/.next/package.json'
  mkdir /app/.next && chown -R node:node /app/.next

USER node
CMD ["pnpm", "dev"]
