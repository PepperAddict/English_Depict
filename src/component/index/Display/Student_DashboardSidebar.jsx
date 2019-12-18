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
    fill: 'green',
    stroke: 'green',
    '& path': {
      stroke: 'green'
    }
  }
});


export default function DashboardSidebar(props) {
  const svgIt = svgColor();

  return (
    <Fragment>
      <nav>
        <a href="/student" className="dashboard-link">
          <span className={svgIt.svg} dangerouslySetInnerHTML={{ __html: outlineLogo }} /> Dashboard</a>

        <ul className="top-nav">
          <li><a href="/dashboard/task">
            <span className={svgIt.svg} dangerouslySetInnerHTML={{ __html: taskIcon }} /> Tasks</a></li>
          <li><a href="/student/blogs">
            <span className={svgIt.svg} dangerouslySetInnerHTML={{ __html: blogIcon }} /> View Blog</a></li>
          <li><a href="/student/blogs">
            <span className={svgIt.svg} dangerouslySetInnerHTML={{ __html: activityIcon }} />Tasks</a></li>
        </ul>

      </nav>
    </Fragment>
  );
}