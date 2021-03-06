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
import { Link } from 'react-router-dom';

//make sure selected view shows for specific type


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
    if (students.length > 0) {
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
      let tasky = new Array()
      tasky.push(thetask)
      setFilteredTask(tasky[0])

    }
  }, [])



  return (
    <Fragment>
      {filteredTask ?
        <div className="task-container">
          <h2>Tasks</h2>
          <nav className="task-nav-container">
            <p><a href="#wotd-task">Word of the Day</a></p>
            <p><a href="#cic-task">Caption the image</a></p>
          </nav>
          <IndividualTask task={filteredTask} setShowTask={setShowTask} />
        </div>
        : <div className="task-container">
          <h2>Tasks</h2>
          <div className="show-when-empty">
            <p>You do not have any tasks pending in your dashboard. Get started and set up tasks for your students. </p>
            <Link to="/parent-dashboard/task"><button className="blue-button">Add Tasks</button></Link></div>
        </div>}
    </Fragment>

  );
}