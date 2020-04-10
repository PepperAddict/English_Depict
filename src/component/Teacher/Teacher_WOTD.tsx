import React, { useState, Fragment } from 'react';
import { TeacherContext } from '../index/Context';
import moment from 'moment';
import { ADD_TASK } from '../../mutation/mutation';
import { useMutation } from '@apollo/react-hooks';

function WOTDStudentList(props) {
    const [students] = useState(props.students);
    const studentsArray = new Array();

    const theStudents = e => {
        if (e.target.checked) {
            props.setSelectedStudents([...props.selectedStudents, e.target.name])
        } else {
            const index = props.selectedStudents.indexOf(e.target.name);
            props.selectedStudents.splice(index, 1)
        }

    }


    return (
        <div>
            {(students) ? students.map((students, key) => {
                return <label key={key}> {students.name} <input type="checkbox" onChange={theStudents} name={students.student_id} /></label>
            }) : null}
        </div>
    )
}

export default function WOTD(props) {
    const [word, setWord] = useState(null);
    const [sentence, setSentence] = useState(null);
    const [data, setdata] = useState(props.teacher_data);
    const [selectedStudents, setSelectedStudents] = useState(new Array())
    const todaysDate = moment().format('L');
    const [addTask] = useMutation(ADD_TASK);
    const [error, setError] = useState(null)

    const submitWOTD = (e, f = null) => {
        e.preventDefault();
        let newWord = (f) ? f : word;
        if (newWord && sentence && selectedStudents.length > 0) {
            selectedStudents.forEach(kid => {
                let taskObject = {
                    task_code: "WOTD",
                    task_date: todaysDate,
                    student_id: parseInt(kid),
                    teacher_id: data.id,
                    entry: {
                        word: newWord,
                        sentence
                    }
                }
                addTask({
                    variables: {
                        input: taskObject
                    }
                }).then((res) => {console.log(res)}).catch(err => setError('Something went wrong'))
            })
        } else {
            setError('Please fill out the form')
        }

    }

    return (

        <TeacherContext.Consumer>

            {context => (
                <div>
                    {context.wotd ? (
                        <Fragment>
                            <h1>Create {context.wotd} as a Word of the Day Task</h1>
                            <form onSubmit={e => submitWOTD(e, context.wotd)}>
                                <label>
                                    <p>Create an example sentence</p>
                                    <input name="sentence" minLength="5" onChange={e => setSentence(e.target.value)} placeholder={"example sentence for " + context.wotd} />
                                    
                                </label>
                                <WOTDStudentList students={data.students} setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} />
                                <button type="submit">Submit {context.wotd}</button>
                            </form>
                        </Fragment>
                    ) :

                        <form onSubmit={submitWOTD}>

                            <label>
                                <p>Enter a word for Word of the Day Task</p>
                                <input placeholder="vocabulary word" minLength="2" name="vocab" onChange={e => setWord(e.target.value)} />
                            </label>
                            <label>
                                <p>Enter an example sentence for the word</p>
                                <input placeholder="example sentence" minLength="5" onChange={e => setSentence(e.target.value)} name="sentence" />
                            </label>
                            <WOTDStudentList students={data.students} setSelectedStudents={setSelectedStudents} selectedStudents={selectedStudents} />
                            <button type="submit">Submit {word ? word : 'word'}</button>
                        </form>
                    }

                    {data.vocabularies.length > 1 ? (<div>
                        <h2>Vocabulary words to choose from</h2>
                        {data.vocabularies.map((word, key) => {

                            return <button key={key} onClick={e => context.setWOTD(word.vocabulary_word)}>{word.vocabulary_word}</button>
                        })}
                    </div>) : null}

                </div>
            )}
        </TeacherContext.Consumer>
    )
}