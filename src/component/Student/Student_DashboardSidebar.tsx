import React, { Fragment } from 'react';
const outlineLogo = require('../../img/logo-outline.svg');
const personIcon = require('../../img/person.svg');
const blogIcon = require('../../img/pencil.svg');
const taskIcon = require('../../img/task.svg');
const activityIcon = require('../../img/activity.svg');
import { createUseStyles } from 'react-jss';

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

  return (
    <Fragment>
      <nav className={svgIt.svg}>
        <a href="/student" className="dashboard-link">
          <object className={svgIt.svg} type="image/svg+xml" data={outlineLogo.default} />
          Dashboard
        </a>

        <ul className="top-nav">
          <li><a href="/dashboard/task">

            <object type="image/svg+xml" data={taskIcon.default} /> Tasks</a></li>
          <li><a href="/student/blogs">
            <object type="image/svg+xml" data={blogIcon.default} /> View Blog</a></li>
          <li><a href="/student/add_blog">
            <object type="image/svg+xml" data={activityIcon.default} />
            Add blog</a></li>

            <li><a href="/student/settings">Settings</a></li>
        </ul>

      </nav>
    </Fragment>
  );
}