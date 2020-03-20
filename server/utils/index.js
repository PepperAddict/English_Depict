const jwt = require('jsonwebtoken');
// const path = require('path');
// const fs = require('fs');
// const privateKey = fs.readFileSync(path.resolve(__dirname, '../private.pem'), 'utf8');
const privateKey = process.env.TOKENPW;
const signToken = str => {
  return new Promise(resolve => {
    resolve(jwt.sign({
      'token': str
    }, privateKey));
  });
};

const verifyJwt = async req => {
  let token;
  if (req.query && req.query.hasOwnProperty('token')) {
    token = req.query.token;
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) reject(new Error('401: User is not authenticated!'));
      resolve(decoded);
    });
  });
};

const twoAuthKick = (req, res) => {
  res.clearCookie('student_key')
  res.clearCookie('student_id')
  res.clearCookie('token')
  res.clearCookie('userID')
  res.redirect('/')
}

const isAuthenticated = (req, res, next) => {
  let studentKey = ('student_key', req.cookies).student_key || false;
  let token = ('token', req.cookies).token || false;
  if (studentKey && token){
    twoAuthKick(req, res)
  }
  if (token) {
    jwt.verify(token, privateKey, {
      algorithm: 'HS256'
    }, (err, user) => {
      if (err) {
        res.redirect('/');
      }
      if (user) {
        return next();
      }
    });
  }
  if (!token) {
    res.redirect('/');
  }
};

const softAuthenticate = async (req, res, next) => {

  let token = ('token', req.cookies).token || false;
  if (token) {
    await jwt.verify(token, privateKey, (err, user) => {
      if (err) {
        return next();
      }
      if (user) {
        res.redirect('/dashboard');
      }
    });
  }
  if (!token) {
    return next();
  }
};

const choice = async (req, res, next) => {
  let token = ('token', req.cookies).token || false;
  let studentKey = ('student_key', req.cookies).student_key || false;

  if (token) {

    await jwt.verify(token, privateKey, {
      algorithm: 'HS256'
    }, (err, user) => {
      if (err) {
        return next();
      }
      if (user) {
        res.redirect('/dashboard')
      }
    });
  } else if (studentKey) {

    await jwt.verify(studentKey, privateKey, {
      algorithm: 'HS256'
    }, (err, user) => {
      if (user) {
        res.redirect('/student/');
      }
    });
  } else {

    return next();
  }
};



const studentAuthenticate = async (req, res, next) => {
  let studentKey = ('student_key', req.cookies).student_key || false;
  let token = ('token', req.cookies).token || false;
  if (studentKey && token){
    twoAuthKick(req, res)
  }

  if (studentKey) {

    await jwt.verify(studentKey, privateKey, {
      algorithm: 'HS256'
    }, (err, user) => {
      if (err) {
        res.redirect('/');
      }
      if (user) {
        return next();
      }
    });
  } else {
    res.redirect('/');
  }

};
const isInvited = async (req, res, next) => {
  next();
};

module.exports = {
  signToken,
  verifyJwt,
  choice,
  softAuthenticate,
  isAuthenticated,
  studentAuthenticate,
  isInvited
};