import React, { Fragment } from 'react';
import '../../styles/welcome.styl';
import ParentPortal from './ParentRegister';
import TeacherPortal from './TeacherRegister';
const logoImage = require('../../img/cloud.svg');
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Register() {
  return (

    <div className="welcome-container">
      <header className="home-nav">
        <div className="logo-info">


          <div className="logo-hero">
            <img src={logoImage.default} alt="logo big" />
            <h1>Talking Cloud</h1>

          </div>

          <nav>
            <Link to="/teacher-register" className="teacherLogin">Teacher Registration</Link>
            <Link to="/parent-register" className="teacherLogin">Parent Registration</Link>
          </nav>

          <p>NOTE: Only Parents can create Student Accounts. </p>
        </div>
      </header>
    </div>

  )
}