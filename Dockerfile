FROM node:lts-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g webpack-cli webpack
RUN npm link webpack
COPY . /
EXPOSE 8080
CMD ["npm", "run", "prod"]