/*
The teacher side of creating the task for the students
so far image clue
*/

import React, { useState, Fragment, useEffect } from 'react';
import ImageClue from './Teacher_Image-Clue';
import TaskList from './ShowTaskList';

interface TaskPropTypes{
  students: any, 
  teacher_data: any
}

export default function Tasks(props: TaskPropTypes) {
  const [students] = useState(props.students);
  const [task, setTask] = useState('task');

  useEffect(() => {

    let pathname = window.location.pathname;
    switch (true) {
    case pathname.includes('image-clue'):
      setTask('image-clue');
      break;
    case pathname.includes('WOTD'):
      setTask('wotd');
      break;
    }
  }, []);

  return (
    <Fragment>
      {task === 'task' ?
        <div>
          Which task would you like to make?
          <nav>
            <a href="/dashboard/task=image-clue">Image Clue</a>
          </nav>
          <h2>All Tasks</h2>
          <TaskList students={props.teacher_data.students}/>

        </div> : task === 'image-clue' ?
          
          <ImageClue teacher_data={props.teacher_data} students={students}/> : null
      }
    </Fragment>
  );
}