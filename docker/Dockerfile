FROM node:16-alpine AS builder
WORKDIR /usr/src/app

COPY . .

RUN npm ci --ignore-scripts && npm run build

FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production --ignore-scripts

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main"]