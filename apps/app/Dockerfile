
ARG SERVICE_NAME=app
ARG NEXT_TELEMETRY_DISABLED=1

FROM node:20.17.0-alpine3.20 AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY services/$SERVICE_NAME/package.json ./services/$SERVICE_NAME/
RUN apk add --no-cache gcompat && \
  corepack enable pnpm && pnpm i --frozen-lockfile

# Development image - will get the actual project files from bind mount
FROM base AS dev
WORKDIR /app
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY --from=deps /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/services/$SERVICE_NAME/package.json ./services/$SERVICE_NAME/
COPY --from=deps /app/services/$SERVICE_NAME/node_modules ./services/$SERVICE_NAME/node_modules
RUN apk add --no-cache \
  chromium nss freetype harfbuzz ca-certificates ttf-freefont && \
  corepack enable pnpm && \
  mkdir -p /app/services/$SERVICE_NAME/.next && \
  chown -R node:node /app/services/$SERVICE_NAME/.next

USER node
EXPOSE 3000
ENV PORT=3000
CMD pnpm -F ${SERVICE_NAME} run dev

# Build the source code for production
FROM base AS builder
WORKDIR /app
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm -F ${SERVICE_NAME} run build; 

# Production image - copy just the build files and run next
FROM base AS prod
WORKDIR /app
ARG SERVICE_NAME
ENV SERVICE_NAME ${SERVICE_NAME}
ARG NEXT_TELEMETRY_DISABLED
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ENV NODE_ENV=production

RUN apk add --no-cache \
  chromium nss freetype harfbuzz ca-certificates ttf-freefont && \
  mkdir .next && chown -R node:node .next
COPY --from=builder --chown=node:node /app/services/$SERVICE_NAME/.next/standalone ./
COPY --from=builder --chown=node:node /app/services/$SERVICE_NAME/.next/static ./.next/static

USER node
EXPOSE 3000
ENV PORT=3000
CMD ["sh", "-c", "HOSTNAME='0.0.0.0' node server.js"]