FROM node:16-alpine

WORKDIR /usr/apps/clinic

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

RUN npm run build
