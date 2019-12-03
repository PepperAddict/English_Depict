import React from 'react';
// import ChatBox from './Chat/ChatBox.jsx';
import HeroBG from './Front/Hero.jsx';
import '../../styles/welcome.styl';
const logoImage = require('../../img/logo.png');
require('../../img/bubble.jpg');

export default function Welcome() {

  return (
    <div className="welcome-container">
      <header className="home-nav">

        <div className="logo-info">
          <picture>
            <source srcSet={logoImage.srcSet} />
            <img src={logoImage.src} alt="Talking Cloud Logo"/>
          </picture>
          <nav>
            <a href="/login">Teacher Login</a> 
            <a href="/student_login">Student Login</a>
          </nav>
          <h1>The place to practice English</h1>
          <h3>Don’t have a teacher’s account? <a href="/register">Register</a> for one</h3>
        </div>
        <HeroBG />
        
      </header>
    </div>
  );

}
