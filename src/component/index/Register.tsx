import React, { Fragment } from 'react';
import ParentPortal from './ParentRegister';
import TeacherPortal from './TeacherRegister';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Register() {
  return (
    <Fragment>
      <Link to="/teacher-register" className="teacherLogin">Teacher Registration</Link>
      <Link to="/parent-register" className="teacherLogin">Parent Registration</Link>
    </Fragment>
  )
}