import React, { createContext, useState } from 'react';
import { vocab, listCheck } from '../../helpers/vocab';

export const StudentContext = createContext(null);
export const TeacherContext = createContext(null);

export function StudentProvider(props) {
    const [vocabulary, setVocabulary] = useState(null);
    const [def, setDef] = useState(null);
    const [listWords, setwords] = useState(null);

    const [task, setTask] = useState(null);


    const vocabLookup = e => {
        setVocabulary(e)
        const definition = vocab(e);
        setDef(definition)
    }

    const spellCheck = e => {
        const list = listCheck(e)
        setVocabulary(e)
        setwords(list)
    }
    return (
        <StudentContext.Provider value={{
            vocabulary,
            def,
            setVocabulary: e => setVocabulary(e),
            lookUp: e => vocabLookup(e),
            spellCheck: e => spellCheck(e),
            listWords,
            setTask: e => setTask(e),
            task
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}

export function TeacherProvider(props) {
    const [student_id, setStudent_id] = useState(null)
    return (
        <TeacherContext.Provider value={{
            student_id,
            setStudentID: e => setStudent_id(e)
        }}>
            {props.children}
        </TeacherContext.Provider>
    )

}