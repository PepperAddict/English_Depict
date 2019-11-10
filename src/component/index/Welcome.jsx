import React from 'react';
import ChatBox from './Chat/ChatBox.jsx';
import Hero from './Front/Hero.jsx';

export default function Welcome() {

  return (
    <div className="Welcome">
      <Hero />

      <a href="/dashboard">Dashboard</a><br></br>
      <a href="/student">Student Dashboard</a><br></br>
      <a href="/login">Login</a><br></br>
      <a href="/register">Register</a><br></br>
      <a href="/student_login">Student Login</a>

    </div>
  )

}
