import React, { useState, Fragment, useEffect } from 'react';

import TaskList from './ShowTaskList';
import { Link } from 'react-router-dom';

export default function TaskFront(props) {
  return (
    <div>
      Which task would you like to make?
      <nav>
        <ul>
          <li>
            <Link to="/dashboard/task/CIC">Caption the Image</Link>
          </li>
          <li>
            <Link to="/dashboard/task/WOTD">Word of the Day</Link>
          </li>
        </ul>


      </nav>
      <h2>All Tasks</h2>
      <TaskList students={props.teacher_data.students} />

    </div>
  )
}