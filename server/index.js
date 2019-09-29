const path = require('path')
const express = require('express');
const server = express();
const webpack = require('webpack');
const config = require('../src/config/webpack.config.js');
const compiler = webpack(config);
const port = 3030;
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
)
const expressStaticGzip = require('express-static-gzip');
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(expressStaticGzip('dist', {
  enableBrotli: true
}))

server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
})

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log('the server is listening in ' + PORT)
})