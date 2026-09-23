# syntax=docker/dockerfile:1
# Layer cache: install deps before copying application source
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
FROM node:20-alpine AS runtime
WORKDIR /app
ARG APP_PORT=8081
ENV NODE_ENV=production PORT=${APP_PORT}
COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json ./
COPY --chown=node:node . .
USER node
EXPOSE ${APP_PORT}
CMD ["sh", "-c", "export HOST=0.0.0.0; if grep -q '\"web\":' package.json; then npm run web -- --host 0.0.0.0 --port ${PORT:-8081}; else npx react-native start --host 0.0.0.0 --port ${PORT:-8081}; fi"]