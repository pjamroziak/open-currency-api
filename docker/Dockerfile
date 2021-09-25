FROM node:16-alpine AS builder

RUN apk update
RUN apk upgrade
RUN apk add bash make
RUN apk add --no-cache ca-certificates

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --ignore-scripts

COPY . .

RUN make build

FROM node:16-alpine AS production

RUN apk update
RUN apk upgrade
RUN apk add bash make
RUN apk add --no-cache ca-certificates

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --omit=dev --ignore-scripts

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["make", "run"]