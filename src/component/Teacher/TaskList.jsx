/*
To show a list of tasks:
* Image Clue / Image Caption
Sort by date
*/

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//taskInfo needs to reflect for different task types. Right now it's just image clue.
function TaskInfo(props) {
  const [taskType] = useState(props.what);
  return (<Fragment>
    {taskType === 'CIC' ?
      <img src={props.entry.clue_image.urls.thumb} alt={props.entry.clue_image.alt_description} />
      : null

    }
  </Fragment>
  )
}

function Tasks(props) {
  console.log(props);
  return (
    <Fragment>
      {props.task.map((task, key) => {
        return <div key={key} className="individual-task">
          <h3>{moment(new Date(task.task_date)).format('dddd, MMMM D')}</h3>
          <p>student: {props.student_name}</p>
          <TaskInfo what={task.task_code} entry={task.entry} />
          <p>{task.completed_at ? task.completed_at : 'Not Completed Yet'}</p>
        </div>
      })}
    </Fragment>
  )
}

TaskList.propTypes = {
  students: PropTypes.array
}

export default function TaskList(props) {
  const [students] = useState(props.students);
  return (<div className="task-container">
    {students.map((student, key) => {
      return <Tasks key={key} task={student.tasks} student_name={student.name} />
    })}
  </div>);
}