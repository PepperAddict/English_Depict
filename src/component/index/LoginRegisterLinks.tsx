import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

export default function DiffLinks(props) {
    return (
        <div className="different-logins">
            {(props.show === "bottom") ?
                (props.login) ?
                    <ul>
                        <li><Link to="/student-login">Student Login</Link></li>
                        {(props.from === "parent") ?
                            <li><Link to="/teacher-login">Teacher Login</Link></li>
                            :
                            <li><Link to="/parent-login">Parent Login</Link></li>

                        }

                    </ul> :
                    <ul>
                        {(props.from === "parent") ?
                            <li><Link to="/teacher-register">Teacher Registration</Link></li>
                            :
                            <li><Link to="/parent-register">Parent Registration</Link></li>
                        }

                    </ul>
                :
                <Fragment>
                    <Link to="/" className="logo-container-link">
                        <img className="logo-center" src="/images/logo-192.png" alt="logo" />
                    </Link>                    
                    <h1>{(props.from === "parent") ? "Parent Portal" : "Teacher Portal"}</h1>
                    <div className="login-register">
                        <p className={(props.login) ? 'active' : 'standard'}><Link to={(props.from === "parent") ? '/parent-login' : '/teacher-login'}>Login</Link></p>
                        <p className={(props.login) ? 'standard' : 'active'}>
                            <Link to={(props.from === "parent") ? '/parent-register' : '/teacher-register'} > Register </Link>
                        </p>
                    </div>


                </Fragment>
            }

        </div>
    )
}