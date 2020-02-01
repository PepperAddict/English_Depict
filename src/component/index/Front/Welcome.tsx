import React from 'react';
// import ChatBox from './Chat/ChatBox.jsx';
import HeroBG from './Hero';
import '../../../styles/welcome.styl';
const logoImage = require('../../../img/logo.png');
require('../../../img/bubble.jpg');

export default function Welcome() {

  return (
    <div className="welcome-container">
      <header className="home-nav">

        <div className="logo-info">
          <picture>
            <source srcSet={logoImage.srcSet} />
            <img src={logoImage.src} srcSet={logoImage.srcSet} alt="Talking Cloud Logo"/>
          </picture>
          <nav>
            <a className="teacherLogin" href="/login">Teacher Login</a> 
            <a className="studentLogin" href="/student_login">Student Login</a>
          </nav>
          <h1>The place to practice English and track progress.</h1>
        </div>
        <HeroBG />
        
      </header>
    </div>
  );

}
