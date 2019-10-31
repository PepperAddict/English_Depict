
const isProd = (process.env.NODE_ENV === 'production');
const isDev = (process.env.NODE_ENV === 'development');
require('./favicon.ico')

if (isDev) {
  require('webpack-hot-middleware/client?reload=true');
  require('react-hot-loader/patch')
}
require("core-js/stable")
require('regenerator-runtime/runtime');
require('@babel/register')
require('./component/index/react.jsx')
require('./index.html')
console.log('Environment: ' + process.env.NODE_ENV);