FROM node:16-alpine AS builder

RUN apk update
RUN apk upgrade
RUN apk add bash make
RUN apk add --no-cache ca-certificates

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm set-script prepare ""
RUN npm install

COPY . /usr/src/app

RUN make build

FROM node:16-alpine AS production

RUN apk update
RUN apk upgrade
RUN apk add bash make
RUN apk add --no-cache ca-certificates

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm set-script prepare ""
RUN npm install --production

COPY . /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["make", "run"]