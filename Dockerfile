FROM node:12.18.3

WORKDIR /
COPY package*.json ./
RUN npm install
RUN npm install -g webpack-cli webpack
RUN npm link webpack
COPY . /
EXPOSE 80
CMD ["npm", "run", "prod"]