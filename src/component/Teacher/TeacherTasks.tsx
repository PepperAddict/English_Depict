/*
The teacher side of creating the task for the students
so far image clue
*/

import React, { useState, Fragment, useEffect } from 'react';
import ImageClue from './Teacher_Image-Clue';
import TaskFront from './TaskFront'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

interface TaskPropTypes {
  students: any,
  teacher_data: any
}

export default function Tasks(props: TaskPropTypes) {
  const [students] = useState(props.students);


  return (
    <Fragment>
      <Router>
        <TaskFront {...props} students={props.students} teacher_data={props.teacher_data}/>
        <Route path="/dashboard/task/CIC" render={(props) => <ImageClue {...props} teacher_data={props.teacher_data} students={students} />} />
      </Router>
    </Fragment>
  );
}