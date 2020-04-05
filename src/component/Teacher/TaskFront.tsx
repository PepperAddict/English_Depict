import React, { useState, Fragment, useEffect} from 'react';

import TaskList from './ShowTaskList';
import { Link } from 'react-router-dom';

export default function TaskFront(props) {
    return (
        <div>
        Which task would you like to make?
        <nav>
          <Link to="/dashboard/task/CIC">Image Clue</Link>
        </nav>
        <h2>All Tasks</h2>
        <TaskList students={props.teacher_data.students}/>

      </div>
    )
}