require("dotenv").config();


const isDev = process.env.NODE_ENV === "development";

const graphqlHTTP = require("express-graphql");
const cookieParser = require("cookie-parser");
const path = require("path");
// const fs = require('fs');

const pg = require("pg");
const cors = require("cors");

const {
  isAuthenticated,
  softAuthenticate,
  studentAuthenticate,
  choice,
  isInvited
} = require("./utils");

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const server = express();
// const sslOptions = {
//   key: fs.readFileSync(path.join('server', 'ssl', 'server.key')),
//   cert: fs.readFileSync(path.join('server', 'ssl', 'server.crt'))
// };


const http = require("http").createServer(server);

//socket io
const io = require("socket.io").listen(http);
const SocketManager = require("./socket");
io.on("connection", SocketManager);

const webpack = require("webpack");
const config = require("../config/webpack.config.js");
const compiler = webpack(config);
const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);

const expressStaticGzip = require("express-static-gzip");
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
const pgPool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  port: process.env.DB_PORT,
  ssl: { 
    rejectUnauthorized: false
  }
});

const schema = require("./schema/");

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(cookieParser());
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(
  expressStaticGzip("dist", {
    enableBrotli: true
  })
);

router.get(["/", "/parent-login", "/teacher-login"], softAuthenticate, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

router.get(["/register","/parent-register", "/parent-register/:page?", "/teacher-register", "/teacher-register/:page"], softAuthenticate, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"));
});

router.get(["/parent-dashboard/", "/parent-dashboard/:page?", "/parent-dashboard/*", "/teacher-dashboard/", "/teacher-dashboard/:page?", "/teacher-dashboard/*"], cors(),  isAuthenticated,  (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
  }
);

router.get(['/contact', '/privacy', '/terms'], (req, res) => {
  res.sendFile(path.resolve(__dirname, "../dist/index.html"))
})

//student corner
router.get(["/student-login/", "/student-login/:page?"], cors(), choice,(req, res) => {

    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
  }
);

const mailer = require('./middleware/mailer.js');
const imageupload = require('./middleware/imageupload.js');
const forAlexa = require('./middleware/alexa.js');
const forMath = require('./middleware/math')
router.use(mailer)
router.use(imageupload)
router.use(forAlexa)
router.use(forMath)


router.get(["/student-dashboard/", "/student-dashboard/:page?"], cors(), studentAuthenticate,
  (req, res) => {
    
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
  }
);
var whitelist = ['https://talkingcloud.io', 'http://localhost', 'http://localhost:8080']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 

server.use("/api/2/graphql", (req, res) => {
  graphqlHTTP({
    schema: schema,
    graphiql: isDev ? true : false,
    context: { pgPool, req },
    introspection: true,
  })(req, res);
});


const puppet = require('./middleware/puppet.js')
router.use(puppet)

const mupload = require('./middleware/monday.js')
router.use(mupload)

server.use('/', router)

const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log("the server is listening in " + PORT);
});

module.exports = server;
