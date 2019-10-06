require('dotenv').config();
const graphqlHTTP = require('express-graphql');
const fs = require('fs')
const path = require('path')



const pg = require('pg');
const cors = require('cors');


const express = require('express');
const bodyParser = require('body-parser')
const server = express();
const webpack = require('webpack');
const config = require('../config/webpack.config.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
)

const expressStaticGzip = require('express-static-gzip');
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
const pgPool = new pg.Pool({
  host: process.env.DB_HOST,
  user: 'root',
  password: process.env.DB_PASS,
  database: 'depict'
})

const schema = require('./schema/')


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}))

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(expressStaticGzip('dist', {
  enableBrotli: true
}))

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });

})

server.use('/graphql', cors(), (req, res) => {
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: { pgPool, req }
  })(req, res)
});


if (process.env.NODE_ENV === 'development') {
  server.get('/auth/signup', (req, res) => {
    res.send(token)
  })
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('the server is listening in ' + PORT)
})

module.exports = server;