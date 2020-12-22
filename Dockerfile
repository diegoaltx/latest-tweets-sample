FROM node:14

WORKDIR /app

COPY ./app/package*.json ./
RUN npm i

COPY ./app/. ./

CMD [ "npm", "start" ]
