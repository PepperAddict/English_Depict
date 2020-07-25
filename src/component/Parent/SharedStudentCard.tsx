/*
This is for card view in teacher's dashboard for a list of students.
*/

import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
const noPic = require('../../img/no-pic.png');


interface ShowStudentProps {
  student: any,
  index: number,
  key: number,
  teacherID: number,
  student_id: number

}

function ShowStudent(props: ShowStudentProps) {

  return (
      <Fragment>
      Student: 
      { props.student.username} <small>u/{props.student.username}</small>.
        </Fragment>
  );
}

interface ShowCardProps {

  userId: number,
  students: any,
}

export default function ShowCard(props: ShowCardProps) {
    console.log(props.students)

  return (<div className="student-card">

    <h3>You have {(props.students.length > 0) ? props.students.length : '0'} students.</h3>
    <div className="individual-students">
      {props.students.map((student, index) => {
        return <ShowStudent 
          key={index} 
          student_id={student.student_id} 
          index={index} 
          student={student} 
          teacherID={props.userId}  />;
      })}

    </div>

  </div>
  );
}