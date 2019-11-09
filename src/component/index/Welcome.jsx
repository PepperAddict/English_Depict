import React from 'react';
import ChatBox from './Chat/ChatBox.jsx';

export default function Welcome() {

  return (
    <div className="Welcome">
      Helloooooo
      if you want to login go here:
<p></p>
      <a href="/dashboard">Dashboard</a><br></br>
      <a href="/student">Student Dashboard</a><br></br>
      <a href="/login">Login</a><br></br>
      <a href="/register">Register</a><br></br>
      <a href="/student_login">Student Login</a>

      <ChatBox />
    </div>
  )

}
