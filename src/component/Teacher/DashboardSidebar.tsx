import React, { useState, Fragment } from 'react';


const outlineLogo = require('../../img/logo-outline.svg');
const personIcon = require('../../img/person.svg');
const blogIcon = require('../../img/pencil.svg');
const taskIcon = require('../../img/task.svg');
const activityIcon = require('../../img/activity.svg');
const settingsLogo = require('../../img/settings.svg');
const logoutLogo = require('../../img/logout.svg');

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
        <a href="/dashboard" className="dashboard-link"><img src={outlineLogo.default} alt="logo to dashboard" /> Dashboard</a>

        <ul className="top-nav">
          <li><a href="/dashboard/add_student"><img src={personIcon.default} alt="Go to Student" /> Student</a></li>
          <li><a href="/dashboard/task"><img src={taskIcon.default} alt="Go to Tasks" /> Tasks</a></li>
          <li><a href="/"><img src={blogIcon.default} alt="Go to Blog" /> Blog</a></li>
          <li><a href="/"><img src={activityIcon.default} alt="Go to Activity" /> Activity</a></li>
        </ul>


      </nav>
      <nav className="bottom-nav">
        <button type="button"><span><img src={settingsLogo.default} alt="Go to Settings" /></span><a href="/dashboard/settings">Settings</a></button>
        <button id="logout" type="button" onClick={logout}><span><img src={logoutLogo.default} alt="Logout" /></span> Logout</button>
      </nav>
    </Fragment>
  );
}