import React, {useState} from 'react';
import StudentTasks from './StudentTasks';
const defaultImage = require('../../img/no-pic.png');
import SpecialDay from './SpecialDay';
import moment from 'moment';

export default function WelcomeStudent(props) {
    const todaysdate = moment();
    const currentDate = todaysdate.format('dddd, MMMM Do YYYY');
    return (

        <div className="welcome-hero"> <span className="avatar">
        <img className="avatar-image" src={props.data.getStudentByID[0].avatar ? props.data.getStudentByID[0].avatar : defaultImage.src} alt={props.data.getStudentByID[0].name + ' avatar'} />
      </span>
        <h1>Welcome <strong>{props.student.name ? props.student.name : props.student.username}</strong>!</h1>
        <h2>Today is <strong>{currentDate}</strong></h2>
        <SpecialDay />

        {props.data.getStudentByID[0].message &&
          <h2 className="message">❝{props.data.getStudentByID[0].message}❞</h2>}
        <StudentTasks tasks={props.data.getStudentByID[0].tasks} />

      </div>
    )
}