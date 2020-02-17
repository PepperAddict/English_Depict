require('dotenv').config();

const isDev = (process.env.NODE_ENV === 'development');

const graphqlHTTP = require('express-graphql');
const cookieParser = require('cookie-parser');
const path = require('path');
// const fs = require('fs');

const pg = require('pg');
const cors = require('cors');

const {isAuthenticated, softAuthenticate, studentAuthenticate, choice, isInvited } = require('./utils');

const express = require('express');

const bodyParser = require('body-parser');
const server = express();
// const sslOptions = {
//   key: fs.readFileSync(path.join('server', 'ssl', 'server.key')),
//   cert: fs.readFileSync(path.join('server', 'ssl', 'server.crt'))
// };

const http = require('http').createServer(server);

//socket io
const io = require('socket.io').listen(http);
const SocketManager = require('./socket');
io.on('connection', SocketManager);


const webpack = require('webpack');
const config = require('../config/webpack.config.js');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

const expressStaticGzip = require('express-static-gzip');
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
const pgPool = new pg.Pool({
  host: process.env.DB_HOST,
  user: 'pepper@tcdata',
  password: process.env.DB_PASS,
  database: 'talkingcloud'
});
const schema = require('./schema/');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(cookieParser());
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(expressStaticGzip('dist', {
  enableBrotli: true
}));


server.get(['/', '/login'], softAuthenticate,  (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

server.get(['/register', '/register/:page?'], softAuthenticate, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

server.get(['/dashboard/', '/dashboard/:page?',], cors(), isAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

//student corner

server.get(['/student_login/', '/student_login/:page?'], cors(), choice, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

server.get(['/student/', '/student/:page?'], cors(), studentAuthenticate, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

server.use('/graphql', cors(), (req, res) => {
  graphqlHTTP({
    schema: schema,
    graphiql: isDev ? true : false ,
    context: { pgPool, req },
    introspection: true,
  })(req, res);
});

//route for images

const multer = require('multer');
const multerAzure = require('multer-azure')
const { BlobServiceClient } = require('@azure/storage-blob');


const upload = multer({
  storage: multerAzure({
    connectionString: process.env.AZURE_STORAGE_STRING,
    account: 'talkingstorage',
    key: process.env.AZURE_STORAGE_KEY,
    container: 'talkingcontainer',
    blobPathResolver: function(req, file, callback){
      var blobPath = path.basename(Date.now().toString() + path.extname(file.originalname))
      callback(null, blobPath);
    }

  }),
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|svg|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false);
    }
  }
})


server.post('/upload', upload.single('depictImage'), (req, res, next) => {
  if (req.file === undefined) {
    return res.status(400).json({
      msg: 'Image only'
    });
  }else if(req.file === null) {
    return res.status(400).json({
      msg: 'No file was uploaded'
    });
  } else {

    const imageName = req.file.bobPath; 
    const imageLocation = req.file.url; 
    res.json( {
      image: imageName, 
      location: imageLocation
    });
  }
});



const PORT =  process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log('the server is listening in ' + PORT);
});

module.exports = server;