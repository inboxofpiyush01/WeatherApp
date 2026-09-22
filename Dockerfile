# syntax=docker/dockerfile:1
# Layer cache: install deps before copying application source
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
FROM node:20-alpine AS runtime
WORKDIR /app
ARG APP_PORT=3000
ENV NODE_ENV=production PORT=${APP_PORT}
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node . .
USER node
EXPOSE ${APP_PORT}
CMD ["pnpm", "start"]