########################
# 1 — Builder stage
########################
FROM node:22.14.0-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

# copy sources and build
COPY . .
RUN npm run build

########################
# 2 — Runtime stage
########################
FROM node:22.14.0-alpine
WORKDIR /app

# only compiled code + prod deps
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci

CMD ["npm", "run", "start"]
