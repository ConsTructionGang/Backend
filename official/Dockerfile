FROM node:alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY *.js /usr/src/app/
COPY package.json /usr/src/app/
COPY handlers /usr/src/app/
COPY queries /usr/src/app/

RUN mkdir frontend

RUN npm install

EXPOSE 5000
CMD [ "npm", "start" ]