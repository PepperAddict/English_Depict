/*
To show a list of tasks in the Teacher's section:
* Image Clue / Image Caption
Sort by date
*/

import React, { useState, Fragment } from 'react';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { REJECT_OR_APPROVE_TASK } from '../../mutation/mutation';
import { FetchType } from 'apollo-boost';


interface TaskInfoProps {
  entry: any,
  task: any,
  onClick: any
}

function TaskInfoCIC(props: TaskInfoProps) {
  const [task] = useState(props.task);
  return (
    <img src={task.entry.clue_image.urls.thumb} alt={task.entry.clue_image.alt_description} />
  )
}
function TaskInfoWOTD(props) {
  const [task] = useState(props.task);
  return (
    <div>
      word: {task.entry.word}
      sentence: {task.entry.sentence}
    </div>
  )
}

interface TaskPropTypes {
  task: any,
  student_name: string,
  key: number,
  setShowTask: any,
  filteredTask: any
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

          return (<div key={key} className="individual-task">
            <h3>{moment(new Date(task.task_date)).format('dddd, MMMM D')}</h3>
            <p>student: {props.student_name}</p>
            {(task.task_code === "CIC") && <TaskInfoCIC task={task} entry={task.entry} onClick={e => showCurrentTask(task)} />}

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
  students: string,
  teacher: any
}

export default function TaskList(props: TaskListsProp) {

  const [students] = useState(props.students);
  let allTasks = new Array();


  const [showTask, setShowTask] = useState(null);
  let filteredTask;

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
            date: y.task_date
          }
          taskArray.push(tasky)
        } else if (y.task_code == "WOTD") {
          const tasky = {
            task: "WOTD",
            id: y.entry.word,
            date: y.task_date
          }
          taskArray.push(tasky)
        }

      }
    }

    filteredTask = Object.values(taskArray.reduce((x, y) => Object.assign(x, { [y.id]: y }), {}))

    filteredTask.map((task, key) => {
      let what = new Array();
      for (let x of allTasks) {
        task.tasks = what
        if (x.task_code === "WOTD") {
          if (x.entry.word === task.id && !x.accepted) {
            what.push(x)
          }
        } else if (x.task_code === "CIC") {
          if (x.entry.clue_image.image_id === task.id && !x.accepted) {
            what.push(x)
          }
        }
      }

    })
console.log(filteredTask)

  }, [])


  return (
    <Fragment>
      {!showTask ?
        <div className="task-container">
          <div className="wotd">

            <h2>Word of the day</h2>
            {filteredTask.map((ft, key) => {
              if (ft.task === "WOTD" && ft.tasks.length > 0) {
                return <div key={key}>
              <h3>{moment(new Date(ft.date)).format('dddd, MMMM D')}</h3>
                  <p>word: {ft.id}</p>
                  <p>students: {
                    ft.tasks.map((x, key) => {
                      return <p>{x.student_name} : {(!x.submission) ? "Not Completed Yet" : x.submission + ' waiting for review'}</p>
                    })
                  }</p>
                </div>
              }
            })
            } </div>
          <div className="cic">

            <h2>Image Clue (Caption the Image)</h2>
            {filteredTask.map((ft, key) => {
              if (ft.task === "CIC" && ft.tasks.length > 0) {
                return <div key={key}>
                  <p>students: {
                    ft.tasks.map((x, key) => {
                      if (!x.accepted) {
                        return <p>{x.student_name} : {(!x.submission) ? "Not Completed Yet" : x.submission.CIC + ' waiting for review'}</p>
                      }
                      
                    })
                  }</p>
                </div>
              }
            })
            }

          </div>
          {/* {students.map((student, key) => {

            return <Tasks key={key} filteredTask={filteredTask} setShowTask={setShowTask} task={student.tasks} student_name={student.name} />
          })} */}
        </div> : <SelectedTaskView currentTask={showTask} setShowTask={setShowTask} />}

    </Fragment>

  );
}