

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
  // require('react-hot-loader/patch');
}

require('core-js/stable');
require('regenerator-runtime/runtime');
require('@babel/register');
require('./component/index/App.tsx');
require('./index.html');

console.log('Environment: ' + process.env.NODE_ENV);