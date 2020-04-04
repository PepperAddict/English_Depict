import React, { useState, useEffect, Fragment } from 'react';
import Vocabulary from './Vocabulary';
import VocabBucket from './VocabBucket';

export default function DashboardSidebarTwo(props) {
    const [dupeWordt, setDupeWord] = useState('');
    const [dashboard, setDashboard] = useState({
        options: 'welcome',
        newVocab: new Array()
    });
    const showVocab = word => {
        setDashboard({ ...dashboard, newVocab: [...dashboard.newVocab, word] });
    };

    const dupeWord = word => {
        setDupeWord(word);
    };
    return (
        <div className="student-vocabulary">
            {dashboard.vocabulary ?
                <Vocabulary 
                dupeWord={dupeWord} 
                student_id={props.student_id} 
                showVocab={showVocab} 
                vocab={dashboard.vocabulary} 
                allVocab={props.data.getStudentByID[0].vocabularies} 
                definition={dashboard.definition} /> : ''}
            {props.data ? 
            <VocabBucket 
            teacher_id={props.data.getStudentByID[0].teacher_id} 
            dupeWord={dupeWordt} 
            student_id={props.student_id} 
            showVocab={showVocab} 
            vocab={props.data.getStudentByID[0].vocabularies} 
            definition={dashboard.definition} 
             /> : ''}
            {dashboard.newVocab && dashboard.newVocab.map((word, key) => {
                return <p className="new-vocab" key={key}> {word} <b>New!</b></p>
            })} </div>
    )
}