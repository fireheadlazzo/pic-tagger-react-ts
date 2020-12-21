FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./
COPY build build/

RUN npm install

CMD npm start