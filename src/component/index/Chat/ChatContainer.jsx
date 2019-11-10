import React, { useState, useEffect, Fragment } from 'react';


function ChatSidebar(props) {
  const [state, setState] = useState(props)
  return (
    <div id="side-bar">
      <div className="heading">
        <div className="app-name">Chat</div>
      </div>
      <div className="search">

        <input placeholder="search" type="text" />
        <div className="plus"> + </div>
      </div>
      <div className="users" name='users' ></div>
    </div>
  )
}




export default function ChatContainer(props) {
  const [chats, setChat] = useState([])
  const [activeChat, setAC] = useState(null)
  const [state, setState] = useState(props)
  console.log(state)

  const setActiveChat = chat => {
    setAC(chat)
  }

  return (
    <div className="container">
      <ChatSidebar
        logout={state.logout}
        chats={chats}
        user={state.user}
        activeChat={activeChat}
        setActiveChat={setActiveChat} />
      Hello
    </div>
  )

}