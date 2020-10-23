import React, { useState, Fragment } from 'react';
const outlineLogo = require('../../img/logo-outline.svg');
const personIcon = require('../../img/person.svg');
const blogIcon = require('../../img/pencil.svg');
const taskIcon = require('../../img/task.svg');
const activityIcon = require('../../img/activity.svg');
const settingsLogo = require('../../img/settings.svg');
const logoutLogo = require('../../img/logout.svg');
import {Link } from 'react-router-dom';

interface DashboardSidebarProps {
  username: string,
  email: string
}

export default function DashboardSidebar(props: DashboardSidebarProps) {
  const [info, setInfo] = useState('');
  //for clearing cookies during logout
  const clearCookies = (keyName = null) => {
    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() - 1);

    if (keyName) {
      document.cookie = `${keyName}=; expires=${expireDate.toUTCString()};Path=/;`;
    } else {
      const cookies = document.cookie.split(';');

      cookies.forEach((value) => {
        document.cookie = value.replace(/^ +/, '').replace(/=.*/, '=;expires=' + expireDate.toUTCString());
      });
    }
  };


  const logout = () => {
    clearCookies('token');
    clearCookies('userID');
    location.replace('/');

  };

  return (
    <Fragment>
      <div className="teacher-info">
        <p>@{props.username}</p>
        <address>{props.email}</address>
      </div>
      <nav>
        <Link to="/parent-dashboard" className="dashboard-link">
          <img src={outlineLogo.default} alt="logo to dashboard" /> Dashboard
        </Link>

        <ul className="top-nav">
          
          <Link to="/parent-dashboard/add_student">
          <li><img src={personIcon.default} alt="Go to Student" /> Student</li>
          </Link>
          <Link to="/parent-dashboard/task">
            <li><img src={taskIcon.default} alt="Go to Tasks" /> Tasks</li>
          </Link>
          {/* <Link to="/dashboard">
            <li><img src={activityIcon.default} alt="Go to Activity" /> Activity</li>
          </Link> */}
        </ul>


      </nav>
      <nav className="bottom-nav">
        <button type="button"><span><img src={settingsLogo.default} alt="Go to Settings" /></span>
        <Link to="/parent-dashboard/settings">Settings</Link>
        </button>
        <button id="logout" type="button" onClick={logout}><span>
          <img src={logoutLogo.default} alt="Logout" /></span> Logout</button>
      </nav>
    </Fragment>
  );
}