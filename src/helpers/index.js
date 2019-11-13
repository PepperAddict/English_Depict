const Cryptr = require('cryptr');
const cryptr = new Cryptr('iJustWantToGetRidOfThatErrorAboutItHavingToBeAStringAndItsNotPickingUpMyDotEnvFile');

export const encryptMe  = (e) => {
  return cryptr.encrypt(e)
}

export const decryptMe = (e) => {
  return cryptr.decrypt(e)
}

export const cookieParser = (keyName, decryptMe = false) => {
  let cookieData = document.cookie.split(';').map(string => string.trim());;
  const rawCookie = document.cookie.split(/=|;/).map(string => string.trim());
  let newcookie = [] ;
  let blah = cookieData[Symbol.iterator]();
  let cookieContains;
  for (let x of blah ) {
    newcookie.push(x.split('='));
  }
  newcookie.forEach(e => {
    if (e.includes(keyName)) {
      cookieContains = e[1]
    }
  })

  if (cookieContains) {
    if (decryptMe === true) {
      let afterEncrypt = cryptr.decrypt(cookieContains)
      return afterEncrypt
    } else {
      return cookieContains
    }
  } 
}