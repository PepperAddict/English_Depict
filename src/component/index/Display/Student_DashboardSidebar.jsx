import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
const outlineLogo = require('../../../img/logo-outline.svg');
const personIcon = require('../../../img/person.svg');
const blogIcon = require('../../../img/pencil.svg');
const taskIcon = require('../../../img/task.svg');
const activityIcon = require('../../../img/activity.svg');
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
          <object className={svgIt.svg} type="image/svg+xml" data={outlineLogo} />
           Dashboard
        </a>

        <ul className="top-nav">
          <li><a href="/dashboard/task">

            <object type="image/svg+xml" data={taskIcon} /> Tasks</a></li>
          <li><a href="/student/blogs">
            <object type="image/svg+xml" data={blogIcon} /> View Blog</a></li>
          <li><a href="/student/addblog">
<object type="image/svg+xml" data={activityIcon} />
            Add blog</a></li>
        </ul>

      </nav>
    </Fragment>
  );
}