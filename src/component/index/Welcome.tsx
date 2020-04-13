import React from 'react';
// import ChatBox from './Chat/ChatBox.jsx';
import HeroBG from './Hero';
import '../../styles/welcome.styl';
const logoImage = require('../../img/logo.png');
require('../../img/bubble.jpg');
import {Link} from 'react-router-dom';

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
            <Link to="/login" className="teacherLogin">Teacher Login</Link>
            <Link to="/student_login" className="teacherLogin">Student Login</Link>
          </nav>
          <h1>The place to practice English and track progress</h1>
          <Link to="/register" className="registerAccount">Register for a teacher's account</Link>
        </div>
        <HeroBG />
        
      </header>
    </div>
  );

}
