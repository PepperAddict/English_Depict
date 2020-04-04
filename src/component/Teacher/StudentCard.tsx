/*
This is for card view in teacher's dashboard for a list of students.
*/

import React from 'react';
import { Link } from 'react-router-dom';
const noPic = require('../../img/no-pic.png');
import { TeacherContext } from '../index/Context';

interface ShowStudentProps {
  student: any,
  index: number,
  key: number,
  teacherID: number,
  student_id: number

}

function ShowStudent(props: ShowStudentProps) {

  return (
    <TeacherContext.Consumer>
      {context => (
        <Link to='/dashboard/student-info/' > 
        <button type="button" index={props.index} onClick={e => context.setStudentID(props.student_id)}>
          <div className="avatar">
            <img className="avatar-image" src={props.student.avatar ? props.student.avatar : noPic} alt={props.student.name + ' avatar'} />
          </div>
      Student: 
      {props.student.name ? props.student.name : props.student.username} <small>u/{props.student.username}</small>.
    </button>
        </Link>
      )}
    </TeacherContext.Consumer>


  );
}

interface ShowCardProps {
  data: any,
  userId: number,
  students: any,
}

export default function ShowCard(props: ShowCardProps) {

  return (<div className="student-card">
    <h2>Your Students:</h2>
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