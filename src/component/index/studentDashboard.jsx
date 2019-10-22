import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
const id = cookieParser('student_id', true);
import {getStudentInfo} from '../../query/query';


export default function StudentDashboard() {
  const {loading, error, data } = useQuery(getStudentInfo, {variables: {student_id: id}})
  const student = data ? data.getStudentByID[0] : false;
  return(
    <div className="student-container">
      <div className="student-sidebar">
        let's make a post
      </div>
      {loading? 'loading' : error ? 'error' : data ? (
        <div>Welcome {student.name || student.username} </div>
      ) : ''}
    </div>
  )
}