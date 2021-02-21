import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { cookieParser } from '../../helpers';
const ico = require('../../img/icons/logo-top.svg')
import '../../styles/nav.styl'

export default function WelcomeNavigation() {
    const parentID = cookieParser('userID', false);
    const studentId = cookieParser('student_id', false);
    const teacherId = cookieParser('tch', false)

    return (
        <nav className="nav-container">
            <div className="icon-nav">
                <Link to="/">
                    <img alt="Home" src={ico.default} />
                </Link>
            </div>
            <div className="login-nav">
                <Link to="/teacher-login" className="teacherLogin">Teacher Login</Link>
                <Link to="/student-login" className="teacherLogin">Student Login</Link>
                <Link to="/parent-login" className="teacherLogin">Parent Login</Link>
            {(!parentID && !studentId && !teacherId) ?
                <Fragment>
                    {/* <Link className={navStyleCreate.regiButton}  to="/register">Register</Link>  */}
                </Fragment>
                : (parentID) ? <Link to="/parent-dashboard">Parent Dashboard</Link>
                    : (studentId) ? <Link to="/student-dashboard">Student Dashboard</Link>
                        : <Link to="/teacher-dashboard">Teacher Dashboard</Link>}

            </div>





        </nav>
    )
}