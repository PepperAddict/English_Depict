import React, { useState, useEffect, Fragment } from 'react';
import '../../styles/teacherDashboard.styl';
import { TeacherContext } from '../index/Context';
import {Link} from 'react-router-dom'

export default function VocabTask(props) {
    const [vocabs, setvocabs] = useState(props.vocabs);
    return (
        <TeacherContext.Consumer>
            {context => (
                <div className="dashboard-vocabulary">
                    <h3>Student Vocabulary Words</h3>
                    <ul className="dash-vocab-list">
                        {console.log(context.wotd)}
                        {vocabs.map((word, key) => {
                            return <li key={key} onClick={e => context.setWOTD(word.vocabulary_word)} index={word.vocab_id}><Link to="/dashboard/task/WOTD">{word.vocabulary_word}</Link></li>
                        })}
                    </ul>

                </div>
            )}
        </TeacherContext.Consumer>

    )
}