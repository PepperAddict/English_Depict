require('dotenv').config();
const fs = require('fs');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(`
type Query {
  hello: String
}`);
var root = {
  hello: () => {
    return 'hello world';
  }
}
const path = require('path');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync(path.resolve(__dirname,'./private.pem'), 'utf8');
const token = jwt.sign({ "body": "englishExercizes"}, privateKey, { algorithm: 'HS256'});
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



function isAuthenticated(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
      // retrieve the authorization header and parse out the
      // JWT using the split function
      let token = req.headers.authorization;
      let privateKey = fs.readFileSync(path.resolve(__dirname, './private.pem'), 'utf8');
      // Here we validate that the JSON Web Token is valid and has been 
      // created using the same private pass phrase
      
      jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
          
          // if there has been an error...
          if (err) {  
              // shut them out!
              res.status(500).json({ error: 'Not Authorized' });
              throw new Error("Not Authorized");
          }
          // if the JWT is valid, allow them to hit
          // the intended endpoint
          return next();
      });
  } else {
      // No authorization header exists on the incoming
      // request, return not authorized and throw a new error 
      res.status(500).json({ error: "Not Authorized" });
      throw new Error("Not Authorized");
  }
}



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

server.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true

}))
server.get('/dashboard', isAuthenticated, (req, res, next) => {
  console.log(req.headers)
res.json({ "message" : "this is secret"})

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