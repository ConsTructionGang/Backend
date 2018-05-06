FROM node:alpine

RUN apk add --update bash && rm -rf /var/cache/apk/*

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app/

COPY ../src/*.js /usr/src/app/
COPY ../src/package.json /usr/src/app/
COPY ../src/handlers/. /usr/src/app/

RUN npm install 

EXPOSE 5000
CMD [ "npm", "start" ]