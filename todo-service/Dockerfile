FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci --only=production

# Copy source files
COPY . .

# Build the project
RUN npm run build

# ---- Production stage ----
FROM node:20-alpine

WORKDIR /app

# Install curl (needed to download dockerize)
RUN apk add --no-cache curl

# Install dockerize (for waiting DB)
RUN curl -L https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
  | tar -C /usr/local/bin -xzv

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

EXPOSE 5001

# Wait for DB before starting app - change host:port accordingly
CMD ["dockerize", "-wait", "tcp://todo-db:5432", "-timeout", "60s", "node", "dist/server.js"]
