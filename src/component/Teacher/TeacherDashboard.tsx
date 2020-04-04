import React, {useState, Fragment} from 'react';
import VocabTask from './VocabTask';
import ShowCard from './StudentCard';
export default function TeacherDashboard(props) {

    return (
        <Fragment>
            <ShowCard students={props.students} data={props.data} userId={props.userId} />
            {props.vocabs ? 
            <VocabTask vocabs={props.vocabs} /> : <p>No words in students' vocabulary bucket</p>}
        </Fragment>

    )
}