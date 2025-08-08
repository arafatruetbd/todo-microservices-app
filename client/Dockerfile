# client/Dockerfile

# Stage 1 — build with Node
FROM node:18 AS builder
WORKDIR /app

# Copy lockfile/package.json first for caching
COPY package.json package-lock.json* ./

# Use npm ci if package-lock.json exists for deterministic install
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

COPY . .

# Build (Vite's default output dir is "dist")
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm run build

# Stage 2 — serve with nginx
FROM nginx:alpine AS runner

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy build output from builder (Vite output default: /app/dist)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
