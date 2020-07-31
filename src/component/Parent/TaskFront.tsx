import React, { useState, Fragment, useEffect } from 'react';
import '../../styles/taskpage.styl'
import TaskList from './ShowTaskList';
import { Link } from 'react-router-dom';

export default function TaskFront(props) {
  return (
    <div className="dashboard-task-select-container">
      Which task would you like to make?
      <nav>
        <ul className="task-select">
          <li>
            <Link to="/parent-dashboard/task/CIC">Caption this Image</Link>
          </li>
          <li>
            <Link to="/parent-dashboard/task/WOTD">Word of the Day</Link>
          </li>
        </ul>

      </nav>
      <TaskList students={props.teacher_data.students} teacher={props.teacher_data}/>

    </div>
  )
}