import React, { useState, useEffect, Fragment } from 'react';
import ShowCard from './StudentCard';
import AddStudent from './AddStudent';
export default function DashboardStudent(props) {

    return (
        <div className="student-container">
            {props.students.length > 0 ?
                <Fragment>
                    <ShowCard data={props.data} userId={props.userId} students={props.students} />
                    <AddStudent userId={props.userId} students={props.students} />
                </Fragment>
                : <Fragment>
                    <div className="student-card">
                        <h2>Students: 0</h2>
                        <div className="show-when-empty">
                            <p>You do not have any students.</p>
                        </div>
                    </div>

                    <AddStudent userId={props.userId} students={null} />
                </Fragment>
            }
        </div>
    )
}