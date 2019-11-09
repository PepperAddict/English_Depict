import React, {useState, useEffect, Fragment} from 'react';
import io from 'socket.io-client';
const socketUrl = process.env.LOCAL_URL;
import '../../../styles/chat.css';
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from '../../../helpers/Events';
import ChatContainer from './ChatContainer.jsx';



function LoginForm(props) {

  const [nickname, setNickname] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault();
    const {socket} = props
    socket.emit(VERIFY_USER, nickname, sendIt)
  }

  const handleChange = e => {
    setNickname(e.target.value)
  }

  const sendIt = ({user, isUser}) => {
    console.log(user)
    console.log(isUser)
    if (isUser) {
      setError('username is taken')
    } else {
      props.setUser(user)
    }
  }

  const errorFunction = (err) => {
    setError(err)
  }

return (
  <div className="login">
    <form onSubmit={handleSubmit} className="login-form">
    <label htmlFor="nickname">
      <h2>NickName?</h2>
    </label>
    <input type="text" id="nickname" defaultValue={nickname} onChange={handleChange} placeholder="My Username"/>

    </form>
    {error && <div className="error">{error}</div>}
  </div>
)
}

export default function ChatBox(props) {


  const [socket, setChat] = useState(null);
  const [user, setUser] = useState(null)



  const initSocket = e => {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('connected')
    })
    setChat(socket)
  }

  const setUserit = userit => {
    socket.emit(USER_CONNECTED, userit);
    setUser(userit)
  }
  const logout = _ => {
    socket.emit(LOGOUT)
    setUser(null)
  }

  useEffect(() => {
    initSocket()
  }, [])

  return (
    <Fragment>
      { !user ? 
      <LoginForm socket={socket} user={user} setUser={setUserit} />
      : <ChatContainer socket={socket} user={user} logout={logout}/>}
    </Fragment>
  )
}