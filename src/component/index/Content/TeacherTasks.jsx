import React, { useState, Fragment, useEffect } from 'react';
import ImageClue from './Teacher_Image-Clue.jsx';
import PropTypes from 'prop-types';
import TaskList from './TaskList.jsx';

Tasks.propTypes = {
  students: PropTypes.array,
  teacher_data: PropTypes.object
};

export default function Tasks(props) {
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
          <TaskList students={props.teacher_data.students}/>

        </div> : task === 'image-clue' ?
          <ImageClue teacher_data={props.teacher_data} students={students}/> : null
      }
    </Fragment>
  );
}