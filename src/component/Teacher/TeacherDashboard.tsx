import React, {useState, Fragment} from 'react';
import VocabTask from './VocabTask';
import ShowCard from './StudentCard';
export default function TeacherDashboard(props) {
    const [student_id, setStudent_id] = useState(null);
    return (
        <Fragment>
            <ShowCard students={props.students} data={props.data} userId={props.userId} setStudentID={setStudent_id} />
            {props.vocabs ? 
            <VocabTask vocabs={props.vocabs} /> : <p>No words in students' vocabulary bucket</p>}
        </Fragment>

    )
}