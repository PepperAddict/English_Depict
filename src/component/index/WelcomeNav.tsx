import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { cookieParser } from '../../helpers';
const ico = require('../../img/logoWide.svg')
export default function WelcomeNavigation() {
    const parentID = cookieParser('userID', false);
    const studentId = cookieParser('student_id', false);
    const teacherId = cookieParser('tch', false)

    const navStyle = createUseStyles({
        NavTop: {
            position: 'fixed',
            top: '0px',
            background: 'white',
            width: '100%',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            borderBottom: '1px solid #ccc',
            zIndex: '10',
            '& a': {
                margin: '10px'
            }
        },
        regiButton: {
            background: '#f25500',
            color: 'white',
            padding: '10px'
        },
        iconButton: {
            position: 'absolute',
            left: '10px',
            height: '70px',
            cursor: 'pointer',
            margin: '0px !important',
            '& img': {
               height: '70px'
            }
        }
    })

    const navStyleCreate = navStyle()
    return(
        <nav className={navStyleCreate.NavTop}>
                    
                    <Link to="/" className={navStyleCreate.iconButton}><img alt="Home" src={ico.default} /></Link>
                    <Link to="/contact">Contact</Link>
                    {(!parentID && !studentId && !teacherId) ? 
                    <Fragment>
                    <Link className={navStyleCreate.regiButton}  to="/parent-register">Parent Register</Link> 
                    <Link className={navStyleCreate.regiButton}  to="/teacher-register">Teacher Register</Link>
                    </Fragment>                      
                    : (parentID) ? <Link to="/parent-dashboard">Parent Dashboard</Link>
                    : (studentId) ? <Link to="/student-dashboard">Student Dashboard</Link> 
                    : <Link to="/teacher-dashboard">Teacher Dashboard</Link>}

        </nav>
    )
}