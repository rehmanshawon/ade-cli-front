FROM node:14.18.1

COPY . /src

WORKDIR /src

RUN npm install

EXPOSE 3000

CMD npm start