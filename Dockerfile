# syntax=docker/dockerfile:1
# Layer cache: install deps before copying application source
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --legacy-peer-deps; else npm install --legacy-peer-deps; fi
FROM node:20-alpine AS runtime
WORKDIR /app
ARG APP_PORT=3000
ENV NODE_ENV=production PORT=${APP_PORT}
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node . .
USER node
EXPOSE ${APP_PORT}
CMD ["npm", "start"]