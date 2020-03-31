import React, { useState, useEffect, Fragment } from 'react';
import '../../styles/teacherDashboard.styl';

export default function VocabTask(props) {
    const [vocabs, setvocabs] = useState(props.vocabs);
    return (
        <div className="dashboard-vocabulary">
            <h3>Student Vocabulary Words</h3>
            <ul className="dash-vocab-list">
                {vocabs.map((word, key) => {
                    return <li key={key} index={word.vocab_id}>{word.vocabulary_word}</li>
                })}
            </ul>

        </div>
    )
}