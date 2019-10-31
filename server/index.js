require('dotenv').config();
const graphqlHTTP = require('express-graphql');
const cookieParser = require('cookie-parser')
const path = require('path')

const pg = require('pg');
const cors = require('cors');

const {isAuthenticated, softAuthenticate, studentAuthenticate, choice, isInvited } = require('./utils')



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
server.use(cookieParser());
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(expressStaticGzip('dist', {
  enableBrotli: true
}))


server.get(['/', '/login'], cors(), softAuthenticate,  (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
})

server.get(['/register', '/register/:page?'], cors(), isInvited, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
})

server.get(['/dashboard/', '/dashboard/:page?',], cors(), isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
})

//student corner

server.get(['/student_login/', '/student_login/:page?'], cors(), choice, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
})

server.get(['/student/', '/student/:page?'], cors(), studentAuthenticate, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"))
})

server.use('/graphql', cors(), (req, res) => {
  graphqlHTTP({
    schema: schema,
    graphiql: (NODE_ENV="Development") ? true : false,
    context: { pgPool, req },
    introspection: true,
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