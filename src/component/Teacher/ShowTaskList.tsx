/*
To show a list of tasks in the Teacher's section:
* Image Clue / Image Caption
Sort by date
*/

import React, { useState, Fragment } from 'react';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { REJECT_OR_APPROVE_TASK } from '../../mutation/mutation';

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
  key: number,
  setShowTask: any
}

function Tasks(props: TaskPropTypes) {
  const showCurrentTask = (e) => {
    console.log(e)
    props.setShowTask(e)

  }

  return (
    <Fragment>
      {props.task.map((task, key) => {
        if (!task.accepted) {
          return (
            <div key={key} className="individual-task" onClick={e => showCurrentTask(task)}>
              <h3>{moment(new Date(task.task_date)).format('dddd, MMMM D')}</h3>
              <p>student: {props.student_name}</p>
              <TaskInfo what={task.task_code} entry={task.entry} />
              {task.completed_at && 'completed on ' + moment(new Date(task.completed_at)).format('dddd, MMMM D')}
              <p>{task.completed_at !== null ? 'Awaiting approval' : 'Not Completed Yet'}</p>
            </div>
          )
        }
      })}
    </Fragment>
  )
}

//make sure selected view shows for specific type
function SelectedTaskView(props) {
  const [task] = useState(props.currentTask);
  const [reject, setReject] = useState(false);
  const [message, setMessage] = useState(null);
  const [completeTask] = useMutation(REJECT_OR_APPROVE_TASK);

  const disableView = e => {
    e.preventDefault();
    props.setShowTask(false)
  }
  const approveSubmission = e => {
    e.preventDefault();
    setReject(false)
    completeTask({ variables: { input: { task_id: task.task_id, accepted: true } } }).then((e) => {
      props.setShowTask(false);
    })

  }
  const rejectSubmission = e => {
    e.preventDefault();
    setReject(true)
  }

  const submitRejection = e => {
    e.preventDefault();
    completeTask({ variables: { input: { task_id: task.task_id, message: message } } }).then((e) => {
      props.setShowTask(false)
    })

  }

  return (
    <div className="individual-task-modify">
      <img src={task.entry.clue_image.urls.small} />
      Student Input: {task.submission ? task.submission.CIC : 'not yet completed'}. <br></br>
      {typeof task.completed_at === 'string' && (<Fragment>
        <button onClick={approveSubmission}>Approve Submission</button>
        <button onClick={rejectSubmission}>Reject Submission</button>
      </Fragment>

      )}

      {reject &&
        <form onSubmit={submitRejection}>
          <label htmlFor="reject-message">Would you like to add a message as to why you're rejecting this submission?
        <input id="reject-message" name="reject-message" onChange={e => setMessage(e.target.value)} />
          </label>
          <button type="submit">Submit Rejection</button>
        </form>
      }
      <button onClick={disableView}>go back</button>
    </div>
  )

}

interface TaskListsProp {
  students: string
}

export default function TaskList(props: TaskListsProp) {

  const [students] = useState(props.students);
  const [showTask, setShowTask] = useState(null)
  return (
    <Fragment>
      {!showTask ? <div className="task-container">
        {students.map((student, key) => {
          return <Tasks key={key} setShowTask={setShowTask} task={student.tasks} student_name={student.name} />
        })}
      </div> : <SelectedTaskView currentTask={showTask} setShowTask={setShowTask} />}

    </Fragment>

  );
}