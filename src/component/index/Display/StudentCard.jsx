import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

ShowStudent.propTypes = {
  student: PropTypes.object,
  index: PropTypes.number,
};

function ShowStudent({ student, index }) {
  const sendStudent = () => {
    location.replace('/dashboard/student-info=' + student.student_id);
  };
  return (
    <button type="button" onClick={sendStudent} index={index}>
      <div className="avatar">
        <img className="avatar-image" src={student.avatar} alt={student.name + ' avatar'} />
      </div>
      Student: {student.name ? student.name : student.username} <small>u/{student.username}</small>.
    </button>
  );
}

ShowCard.propTypes = {
  data: PropTypes.object,
  userId: PropTypes.number,
  setStudentID: PropTypes.func,
  students: PropTypes.array
};

export default function ShowCard({ data, userId, setStudentID, students }) {

  return (<div className="student-card">
    <h2>Your Students:</h2>
    <h3>You have {(students.length) ? students.length : '0'} students.</h3>
    <div className="individual-students">
      {data.students.map((student, index) => {
        return <ShowStudent key={index} index={index} student={student} teacherID={userId} setStudentID={setStudentID} />;
      })}
    </div>
  </div>
  );
}