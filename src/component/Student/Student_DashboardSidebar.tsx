import React, { Fragment } from 'react';
const outlineLogo = require('../../img/logo-outline.svg');
const personIcon = require('../../img/person.svg');
const blogIcon = require('../../img/pencil.svg');
const taskIcon = require('../../img/task.svg');
const activityIcon = require('../../img/activity.svg');
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const svgColor = createUseStyles({
  svg: {
    stroke: 'green',
    fill: 'green',
    ' svg': {
      stroke: 'green'
    }
  }
});


export default function DashboardSidebar(props) {
  const svgIt = svgColor();
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
    clearCookies('student_id');
    clearCookies('student_key');
    location.replace('/');

  };

  return (

      <div className="sidebar">
      <nav className={svgIt.svg}>
        <Link to="/student-dashboard" className="dashboard-link">
          <object className={svgIt.svg} type="image/svg+xml" data={outlineLogo.default} />
          Dashboard
        </Link>
        <Link to="/student-dashboard/tasks">
          <object type="image/svg+xml" data={taskIcon.default} />
          Tasks
        </Link>
        {/* <Link to="/student/blog">
          <object type="image/svg+xml" data={blogIcon.default} />
          Blog
        </Link> */}

        {/* <Link to="/student/settings">
          <object type="image/svg+xml" data={activityIcon.default} />
        Settings
      </Link> */}
      </nav>

      <button type="button" onClick={logout}>Logout</button>
      </div>

  );
}