import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { cookieParser } from '../../helpers';
export default function WelcomeNavigation() {
    const teacherId = cookieParser('userId', false)
    const studentId = cookieParser('student_id', false)

    console.log(teacherId + ' ok ' + studentId)
    const navStyle = createUseStyles({
        NavTop: {
            position: 'sticky',
            top: '0px',
            background: 'white',
            width: '100%',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            boxShadow: '0px 3px 6px #828282',
            zIndex: '10',
            '& a': {
                margin: '10px'
            }
        },
        regiButton: {
            background: '#f25500',
            color: 'white',
            padding: '10px'
        }
    })

    const navStyleCreate = navStyle()
    return(
        <nav className={navStyleCreate.NavTop}>
            <Link to="/">Home</Link>

                    <Link to="/contact">Contact</Link>
                    {(!teacherId && !studentId) ? 
                    <Link className={navStyleCreate.regiButton}  to="/register">Register</Link>                      
                    : (teacherId) ? <Link to="/dashboard">Teacher Dashboard</Link>
                    : <Link to="/student">Student Dashboard</Link>}

        </nav>
    )
}