FROM node

ADD . .

RUN npm install

CMD node server.js
