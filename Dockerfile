FROM node:20.16.0-slim

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN apt-get update && \
  apt-get install -y chromium fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends && \
  corepack enable pnpm && pnpm install && \
  # Fix EACCES: permission denied, open '/app/.next/package.json'
  mkdir /app/.next && chown -R node:node /app/.next

USER node
CMD ["pnpm", "dev"]
