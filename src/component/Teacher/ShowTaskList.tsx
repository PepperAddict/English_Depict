/*
To show a list of tasks in the Teacher's section:
* Image Clue / Image Caption
Sort by date
*/

import React, { useState, Fragment, useEffect, useLayoutEffect } from 'react';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { REJECT_OR_APPROVE_TASK } from '../../mutation/mutation';
import Doughnut from './doughnut';
import IndividualTask from './ShowTaskIndividual';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


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
      {(task.task_code === "CIC") ? (<Fragment>
          <img src={task.entry.clue_image.urls.small} />
          <p>Student Input: {task.submission ? task.submission.CIC : 'not yet completed'}. </p>

        </Fragment>) : (task.task_code === "WOTD") && (
          <Fragment>
            <p>Word: {task.entry.word}</p>
            <p>example Sentence: {task.entry.sentence}</p>
            <p>Student Input: {task.submission ? task.submission.WOTD : 'not yet completed'}.</p> 
          </Fragment>
        )}
      
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
  students: string,
  teacher: any
}

export default function TaskList(props: TaskListsProp) {

  const [students] = useState(props.students);
  let allTasks = new Array();


  const [showTask, setShowTask] = useState(null);
  let thetask;
  const [filteredTask, setFilteredTask] = useState(null);

  useState(() => {
    const taskArray = new Array();
    for (let x of students) {
      for (let y of x.tasks) {
        let newobj = new Object();
        newobj = {
          ...y,
          student_id: x.student_id,
          student_name: x.name
        }
        allTasks.push(newobj)
        if (y.task_code == "CIC") {
          const tasky = {
            task: "CIC",
            id: y.entry.clue_image.image_id,
            date: y.task_date,
          }
          taskArray.push(tasky)
        } else if (y.task_code == "WOTD") {
          const tasky = {
            task: "WOTD",
            id: y.entry.word,
            date: y.task_date,
          }
          taskArray.push(tasky)
        }

      }
    }

    thetask = Object.values(taskArray.reduce((x, y) => Object.assign(x, { [y.id]: y }), {}))


    thetask.map((task, key) => {
      let what = new Array();
      let pending = new Array();
      let finished = new Array();
      let notstarted = new Array();

      for (let x of allTasks) {
        let finishedCount = finished.length

        task.tasks = what
        task.forChart = {
          not_started: (notstarted) ? notstarted.length : null,
          pending: (pending) ? pending.length : null,
          finished: (finished) ? finishedCount : null,
          inall: notstarted.length + pending.length + finished.length
        }

        if (x.task_code === "WOTD") {
          if (x.entry.word === task.id) {
            if (x.completed_at) {
              if (x.accepted) {
                finished.push('accepted')
              } else {
                pending.push('pending')
              }
            } else {
              notstarted.push('undone')
            }
            what.push(x)
          }

        } else if (x.task_code === "CIC") {
          if (x.entry.clue_image.image_id === task.id) {
            if (x.completed_at) {
              if (x.accepted) {
                finished.push('accepted')
              } else {
                pending.push('pending')
              }
            } else {
              notstarted.push('undone')
            }
            what.push(x)
          }
        }
      }

    })
    setFilteredTask(thetask)

  }, [])




  return (
    <Fragment>

        <div className="task-container">
          <nav className="task-nav-container">
            <p><a href="#wotd-task">WOTD</a></p>
            <p><a href="#cic-task">Caption the image</a></p>
          </nav>
          <div className="wotd-container" id="wotd-task">

            <h2>Word of the day</h2>

            <IndividualTask task={filteredTask} type="WOTD" setShowTask={setShowTask} />

          </div>
          <div className="cic-container" id="cic-task">

            <h2>Image Clue (Caption the Image)</h2>
            <IndividualTask task={filteredTask} type="CIC" setShowTask={setShowTask} />

          </div>

        </div> 
        }

    </Fragment>

  );
}