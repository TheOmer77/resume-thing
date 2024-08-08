FROM node:20.16.0-alpine3.20 AS base
ARG NEXT_TELEMETRY_DISABLED=1

# Install dependencies
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN apk add --no-cache libc6-compat && \
  corepack enable pnpm && pnpm i --frozen-lockfile

# Development image - will get the actual project files from bind mount
FROM base AS dev
WORKDIR /app
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY --from=deps /app/package.json /app/pnpm-lock.yaml ./
COPY --from=deps /app/node_modules ./node_modules
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates \
  ttf-freefont && \
  corepack enable pnpm && \
  mkdir .next && chown -R node:node .next

USER node
EXPOSE 3000
ENV PORT=3000
CMD [ "pnpm", "dev" ]

# Build the source code for production
FROM base AS builder
WORKDIR /app
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build; 

# Production image - copy just the build files and run next
FROM base AS prod
WORKDIR /app
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ENV NODE_ENV=production

RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates \
  ttf-freefont && \
  mkdir .next && chown -R node:node .next
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
ENV PORT=3000
CMD ["sh", "-c", "HOSTNAME='0.0.0.0' node server.js"]