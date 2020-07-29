/*
This is for card view in teacher's dashboard for a list of students.
*/

import React, {useEffect, useState} from 'react';
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
        <Link to='/parent-dashboard/student-info/' >
          <button type="button" index={props.index} onClick={e => context.setStudentID(props.student_id)}>
            <div className="avatar">
              <img className="avatar-image" src={props.student.avatar ? props.student.avatar : noPic } alt={props.student.name + ' avatar'} />
            </div>
            <div className="brief-student-info">
              <h3>{props.student.name ? props.student.name : props.student.username}</h3> <small>{props.student.username} | {props.student.identifier}</small>
            </div>
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
    <h2>Students: {(props.students.length > 0) ? props.students.length : '0'}</h2>
    <div className="individual-students">
      {props.students.map((student, index) => {
        return <ShowStudent
          key={index}
          student_id={student.student_id}
          index={index}
          student={student}
          teacherID={props.userId} />;
      })}
    </div>
  </div>
  );
}