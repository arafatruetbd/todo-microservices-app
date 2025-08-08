# Use a smaller Node.js base image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies only for production build
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# --------- Production Stage ---------
FROM node:20-alpine AS production

WORKDIR /app

# Install curl (needed to download dockerize)
RUN apk add --no-cache curl

# Install dockerize (wait utility)
RUN curl -L https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz \
  | tar -C /usr/local/bin -xzv

# Copy only built files and production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy build output from previous stage
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 5000

# Wait for Postgres on port 5432 on host 'user-db' before starting the server
CMD ["dockerize", "-wait", "tcp://user-db:5432", "-timeout", "60s", "node", "dist/server.js"]
