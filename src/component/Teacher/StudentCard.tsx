/*
This is for card view in teacher's dashboard for a list of students.
*/

import React from 'react';

interface ShowStudentProps{
  student: any, 
  index: number,
  key: number,
  teacherID: number,
  setStudentID: any
}

function ShowStudent(props: ShowStudentProps) {
  const sendStudent = () => {
    location.replace('/dashboard/student-info=' + props.student.student_id);
  };
  return (
    <button type="button" onClick={sendStudent} index={props.index}>
      <div className="avatar">
        <img className="avatar-image" src={props.student.avatar} alt={props.student.name + ' avatar'} />
      </div>
      Student: {props.student.name ? props.student.name : props.student.username} <small>u/{props.student.username}</small>.
    </button>
  );
}

interface ShowCardProps{
  data: any, 
  userId: number,
  setStudentID: any,
  students: any,
}

export default function ShowCard(props: ShowCardProps) {

  return (<div className="student-card">
    <h2>Your Students:</h2>
    <h3>You have {(props.students.length) ? props.students.length : '0'} students.</h3>
    <div className="individual-students">
      {props.data.students.map((student, index) => {
        return <ShowStudent key={index} index={index} student={student} teacherID={props.userId} setStudentID={props.setStudentID} />;
      })}
    </div>
  </div>
  );
}