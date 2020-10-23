import React, { useState, useEffect, Fragment } from 'react';
import '../../styles/tasks.styl';
import { cookieParser } from '../../helpers';
const currentStudentId = parseInt(cookieParser('student_id', true));
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_TASK } from '../../mutation/mutation';
// import SidebarTodo from './StudentSideBarTODO';
import { StudentContext } from '../index/Context';

interface TaskCICProps {
    task: object
}

export default function taskCIC(props: TaskCICProps) {
    const [task, setTask] = useState(props.task);
    const [submitTask] = useMutation(SUBMIT_TASK);
    const [entry, setEntry] = useState(null);
    const [currentEntry, setCurrentEntry] = useState(null)

    const submitTaskForm = (e, context) => {

        e.preventDefault();
        const bundledTaskMutation = {
            task_id: task.task_id,
            submission: {
                CIC: entry
            }
        }
        submitTask({ variables: { input: bundledTaskMutation } }).then((e) => {
            setCurrentEntry(entry);
            context.setTask(null);
        }).catch(e => console.log(e))
    }



    return (
        <StudentContext.Consumer>
            {context => (
                <Fragment>
                    <div className="CIC-container">
                        <span onClick={e => context.setTask(null)}>close</span>
                        <div className="task-CIC-fill-in">
                            <h1>Caption the image!</h1>
                            <p>Caption: {entry ? entry : currentEntry ? currentEntry : ' '}</p>
                            <form onSubmit={ e => submitTaskForm(e, context)}>
                                <label htmlFor="caption-input">
                                    <input id="caption-input" minLength="5" name="caption-input" onChange={e => setEntry(e.target.value)} />
                                </label>
                                <button type="submit">Submit Caption</button>
                            </form>
                            <div className="CIC-image-container">
                                <picture>
                                    <source media="(max-width: 799px)" srcSet={task.entry.clue_image.urls.small} />
                                    <source media="(min-width: 800px)" srcSet={task.entry.clue_image.urls.full} />
                                    <img src={task.entry.clue_image.urls.regular} alt={task.entry.clue_image.alt_description} />
                                </picture>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </StudentContext.Consumer>

    )
}