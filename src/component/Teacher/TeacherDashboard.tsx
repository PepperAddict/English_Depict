import React, {useState, Fragment} from 'react';
import VocabTask from './VocabTask';
import ShowCard from './StudentCard';
import SharedCard from './SharedStudentCard';
import TaskShow from './ShowTaskList'
export default function TeacherDashboard(props) {

    return (
        <Fragment>
            <ShowCard students={props.students} data={props.data} userId={props.userId} />
            {props.data.share && <SharedCard students={props.data.share.shared} userId={props.userId}/>}
            {props.vocabs ? 
            <VocabTask vocabs={props.vocabs} /> : <p>No words in students' vocabulary bucket</p>}
            <TaskShow students={props.students} teacher={props.data}/>
        </Fragment>

    )
}