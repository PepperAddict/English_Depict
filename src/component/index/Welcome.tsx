import React from 'react';
// import ChatBox from './Chat/ChatBox.jsx';
import HeroBG from './Hero';
import '../../styles/welcome.styl';
const logoImage = require('../../img/cloud.svg');
require('../../img/bubble.jpg');
import {Link} from 'react-router-dom';
import { createUseStyles } from 'react-jss';


export default function Welcome() {

  return (
    <div className="welcome-container">

      <header className="home-nav">
        <div className="logo-info">
          
          <div className="logo-hero">
            <img src={logoImage.default} alt="logo big"/>
            <h1>Talking Cloud</h1>
          </div>

          <nav>
            <Link to="/login" className="teacherLogin">Teacher Login</Link>
            <Link to="/student_login" className="teacherLogin">Student Login</Link>
          </nav>
          <h1>The place to practice English and track progress</h1>
        </div>
        
      </header>
    </div>
  );

}
