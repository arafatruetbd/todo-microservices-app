# client/Dockerfile

# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Enable corepack to use Yarn
RUN corepack enable

# Copy dependency files
COPY package.json yarn.lock ./

# Install dependencies (prod + dev) for build
RUN yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build the Vite app (outputs to /app/dist by default)
ENV NODE_ENV=production
RUN yarn build

# ---------- Stage 2: Runtime ----------
FROM nginx:alpine AS runner

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
