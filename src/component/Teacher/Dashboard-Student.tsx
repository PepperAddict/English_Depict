import React, { useState, useEffect, Fragment } from 'react';
import ShowCard from './StudentCard';
import AddStudent from './AddStudent';
export default function DashboardStudent(props) {

    return (
        <div className="student-container">
            {props.students.length > 0 ?
                <Fragment>
                    <ShowCard data={props.data} userId={props.userId} students={props.students} />
                    <AddStudent userId={props.userId}/>
                </Fragment>
                : <AddStudent userId={props.userId}/>
            }
        </div>
    )
}