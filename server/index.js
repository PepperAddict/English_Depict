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
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  port: process.env.DB_PORT,
  ssl: true
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
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_KEY,
  Bucket: 't-cloud-bucket', // bucket name
  region: 'us-east-1'
});

const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 't-cloud-bucket',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function(req, file, cb) {
      cb(null, path.basename(Date.now().toString() + path.extname(file.originalname))); //giving it a unique name
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
});


server.post('/upload', profileImgUpload.single('depictImage'), (req, res, next) => {
  if (req.file === undefined) {
    return res.status(400).json({
      msg: 'Image only'
    });
  }else if(req.file === null) {
    return res.status(400).json({
      msg: 'No file was uploaded'
    });
  } else {

    const imageName = req.file.key; 
    const imageLocation = req.file.location; 
    res.json( {
      image: imageName, 
      location: imageLocation
    });

    //delete the old file using the originalname that was sent over. 
    //TODO find a better solution than using original name to store old name.
    let params = { Bucket: "t-cloud-bucket", Key: req.file.originalname};
    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err)
      else console.log(data)
    })
  }

});


const PORT =  process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log('the server is listening in ' + PORT);
});

module.exports = server;