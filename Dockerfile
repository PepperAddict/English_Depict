FROM node:latest

WORKDIR /
COPY package*.json ./
RUN npm install
RUN npm install -g webpack-cli webpack
RUN npm link webpack
COPY . /
EXPOSE 8080
CMD ["npm", "run", "prod"]