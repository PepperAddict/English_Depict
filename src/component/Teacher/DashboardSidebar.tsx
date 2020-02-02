import React, {Fragment} from 'react';


const outlineLogo = require('../../img/logo-outline.svg');
const personIcon = require('../../img/person.svg');
const blogIcon = require('../../img/pencil.svg');
const taskIcon = require('../../img/task.svg');
const activityIcon = require('../../img/activity.svg');

interface DashboardSidebarProps {
  username: string,
  email: string
}

export default function DashboardSidebar(props: DashboardSidebarProps) {

  return (
    <Fragment>
      <div className="teacher-info">
        <p>@{props.username}</p>
        <address>{props.email}</address>
      </div>
      <nav>
        <a href="/dashboard" className="dashboard-link"><img src={outlineLogo} alt="logo to dashboard"/> Dashboard</a>

        <ul className="top-nav">
          <li><a href="/dashboard/add_student"><img src={personIcon} alt="Go to Student" /> Student</a></li>  
          <li><a href="/dashboard/task"><img src={taskIcon} alt="Go to Tasks" /> Tasks</a></li>
          <li><a href="/"><img src={blogIcon} alt="Go to Blog" /> Blog</a></li>
          <li><a href="/"><img src={activityIcon} alt="Go to Activity" /> Activity</a></li>
        </ul>
                
      </nav>
    </Fragment>
  );
}