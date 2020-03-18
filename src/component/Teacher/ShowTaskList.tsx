/*
To show a list of tasks:
* Image Clue / Image Caption
Sort by date
*/

import React, { useState, Fragment } from 'react';
import moment from 'moment';

interface TaskInfoProps {
  entry: any,
  what: string
}

function TaskInfo(props: TaskInfoProps) {
  const [taskType] = useState(props.what);
  return (<Fragment>
    {/* for now only capture the image */}
    {taskType === 'CIC' &&
      <img src={props.entry.clue_image.urls.thumb} alt={props.entry.clue_image.alt_description} />

    }
  </Fragment>
  )
}

interface TaskPropTypes {
  task: any,
  student_name: string,
  key: number
}

function Tasks(props: TaskPropTypes) {
  console.log(props.task)
  return (
    <Fragment>
      {props.task.map((task, key) => {
        if (!task.accepted) {
          return (
            <div key={key} className="individual-task">
              <h3>{moment(new Date(task.task_date)).format('dddd, MMMM D')}</h3>
              <p>student: {props.student_name}</p>
              <TaskInfo what={task.task_code} entry={task.entry} />
              {task.completed_at && 'completed on ' + moment(new Date(task.completed_at)).format('dddd, MMMM D')}
              <p>{!task.accepted ? 'Awaiting approval' : 'Not Completed Yet'}</p>
            </div>
          )
        }

      })}
    </Fragment>
  )
}

interface TaskListsProp {
  students: string
}

export default function TaskList(props: TaskListsProp) {
  const [students] = useState(props.students);
  return (<div className="task-container">
    {students.map((student, key) => {
      return <Tasks key={key} task={student.tasks} student_name={student.name} />
    })}
  </div>);
}