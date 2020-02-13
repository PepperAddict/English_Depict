const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken');
const cryptr = new Cryptr(process.env.SALT);
// const cryptr = new Cryptr("candy");

export const clearCookies = (keyName = null) => {
  let expireDate = new Date();
  expireDate.setTime(expireDate.getTime() - 1);

  if (keyName) {
    document.cookie = `${keyName}=; expires=${expireDate.toUTCString()};Path=/;`;
  } else {
    const cookies = document.cookie.split(';');

    cookies.forEach((value) => {
      document.cookie = value.replace(/^ +/, '').replace(/=.*/, '=;expires=' + expireDate.toUTCString());
    });
  }
};

const privateKey = process.env.TOKENPW;
export const signMe = str => {
  return new Promise(resolve => {
    resolve(jwt.sign({
      'token': str
    }, privateKey));
  });
};

export const encryptMe  = (e) => {
  return cryptr.encrypt(e);
};

export const decryptMe = (e) => {
  return cryptr.decrypt(e);
};

export const cookieParser = (keyName, decryptMe = false) => {
  let cookieData = document.cookie.split(';').map(string => string.trim());
  const rawCookie = document.cookie.split(/=|;/).map(string => string.trim());
  let newcookie = [] ;
  let blah = cookieData[Symbol.iterator]();
  let cookieContains;
  for (let x of blah ) {
    newcookie.push(x.split('='));
  }
  newcookie.forEach(e => {
    if (e.includes(keyName)) {
      cookieContains = e[1];
    }
  });

  if (cookieContains) {
    if (decryptMe === true) {
      let afterEncrypt = cryptr.decrypt(cookieContains);
      return afterEncrypt;
    } else {
      return cookieContains;
    }
  } 
};