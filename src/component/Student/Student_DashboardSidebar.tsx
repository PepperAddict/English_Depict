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

  return (
    <Fragment>
      <nav className={svgIt.svg}>
        <Link to="/student" className="dashboard-link">
          <object className={svgIt.svg} type="image/svg+xml" data={outlineLogo.default} />
          Dashboard
        </Link>
        <Link to="/dashboard/task">
          <object type="image/svg+xml" data={taskIcon.default} /> Tasks
          Task
        </Link>

        <Link to="/student/add-blog">
          <object type="image/svg+xml" data={blogIcon.default} />
          Add Blog
        </Link>

        <Link to="/student/settings">
          <object type="image/svg+xml" data={activityIcon.default} />
        Settings
      </Link>
      </nav>
    </Fragment>
  );
}