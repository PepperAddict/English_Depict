import React, { useState, Fragment, useEffect } from 'react';
import '../../styles/taskpage.styl'
import TaskList from './ShowTaskList';
import { Link } from 'react-router-dom';

export default function TaskFront(props) {
  return (
    <div className="dashboard-task-select-container">
      <Link to="/parent-dashboard/task/auto-task"><button className="auto-task-button">Auto Task</button></Link>
      Which task would you like to make?
      <nav>
        <ul className="task-select">
          <li>
            <Link to="/parent-dashboard/task/CIC">
              <p><strong>Image Clue</strong></p>Caption the Image</Link>
          </li>
          <li>
            <Link to="/parent-dashboard/task/WOTD"><p><strong>Word of the Day</strong></p>Sight Words</Link>
          </li>
        </ul>

      </nav>
      <TaskList students={props.teacher_data.students} teacher={props.teacher_data}/>

    </div>
  )
}