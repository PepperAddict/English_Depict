
const isProd = (process.env.NODE_ENV === 'production');
const isDev = (process.env.NODE_ENV === 'development');
require('./favicon.ico');

//for manifest
require('./img/logoPlain.png');

//add serviceWorker 

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register('./sw.js').then(function (registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function (err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

//reload on changes
if (isDev) {
  require('webpack-hot-middleware/client?reload=true');
  require('react-hot-loader/patch');
}

require('core-js/stable');
require('regenerator-runtime/runtime');
require('@babel/register');
require('./component/index/react.jsx');
require('./index.html');

//for heroku 
if (isProd) {
  var http = require('http');
  setInterval(function() {
    http.get('https://talking-cloud.herokuapp.com/');
  }, 300000); // every 5 minutes (300000)
}
console.log('Environment: ' + process.env.NODE_ENV);