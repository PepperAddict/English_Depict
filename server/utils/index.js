const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const privateKey = fs.readFileSync(path.resolve(__dirname,'../private.pem'), 'utf8');

const signToken = str => {
  return new Promise(resolve => {
    resolve(jwt.sign({"token": str}, privateKey, {algorithm: 'HS256'}))
  })
}

const verifyJwt = async req => {
  let token;
  if (req.query && req.query.hasOwnProperty('token')) {
    token = req.query.token
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) reject(new Error('401: User is not authenticated!'));
      resolve(decoded)
    })
  })
}



const isAuthenticated = (req, res, next) => {
  let token = ('token', req.cookies).token || false;
  if (token) {

      jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
          if (err) {  
              res.redirect('/')
          }
          if (user) {
            return next();
          }
      });
  }
  if (!token) {
    res.redirect('/')
  }
}

const softAuthenticate = async (req, res, next) => {
  let token = ('token', req.cookies).token || false;
  if (token) {
      await jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
          if (err) {  
              return next();
          } 
          if (user) {
            return res.redirect('/dashboard')
          }
      });
  }
  if (!token) {
      return next();
  }
}

module.exports = { signToken, verifyJwt, softAuthenticate, isAuthenticated}