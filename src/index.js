
const isProd = (process.env.NODE_ENV === 'production');
const isDev = (process.env.NODE_ENV === 'development');
require('./favicon.ico')

//reload on changes
if (isDev) {
  require('webpack-hot-middleware/client?reload=true');
  require('react-hot-loader/patch')
}

require("core-js/stable")
require('regenerator-runtime/runtime');
require('@babel/register')
require('./component/index/react.jsx')
require('./index.html')

//for heroku 
if (isProd) {
  var http = require("http");
  setInterval(function() {
    http.get("https://english-depict.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
}
console.log('Environment: ' + process.env.NODE_ENV);