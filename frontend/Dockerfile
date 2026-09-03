# frontend/Dockerfile

# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (cached layer unless package.json changes)
COPY package.json package-lock.json ./
RUN npm ci

# VITE_API_URL is baked into the JS bundle at build time — pass it as a build arg
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM nginx:alpine

# Copy the built assets from Stage 1 — Node.js is not included in this image
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA routing: all paths fall back to index.html so React Router handles them
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
