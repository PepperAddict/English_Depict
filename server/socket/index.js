const Server = require('socket.io');
const io = new Server();
const {VERIFY_USER, USER_CONNECTED, LOGOUT} = require('../../src/helpers/Events')
const {createUser, createMessage, createChat} = require('../../src/helpers/Factories')
let connectedUsers = { }

module.exports = function(socket) {
  console.log('socket: ' + socket.id);
  socket.on(VERIFY_USER, (nickname, cb) => {
    if (isUser(connectedUsers, nickname)){
      cb({isUser: true, user: null})
    } else {
      cb({isUser: false, user: createUser( {name: nickname})})
    }
  })

  //user connects with username 
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user;
    io.emit(USER_CONNECTED, connectedUsers)
    console.log(connectedUsers)
  })


  //useful functions
  function addUser(userList, user) {
    let newList = Object.assign({}, userList)
    newList[user.name] = user 
    return newList
  }

  function removeUser(userList, username) {
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList
  }
  function isUser(userList, username) {
    return username in userList
  }
}

