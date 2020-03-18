import React, { useState, useEffect, Fragment } from 'react';
import '../../styles/tasks.styl';
import { cookieParser } from '../../helpers';
const currentStudentId = parseInt(cookieParser('student_id', true));
import { useMutation } from '@apollo/react-hooks';
import { SUBMIT_TASK } from '../../mutation/mutation';
import SidebarTodo from './StudentSideBarTODO';

interface TaskCICProps {
    task: object

}
export default function taskCIC(props: TaskCICProps) {
    const [task, setTask] = useState(props.task);
    const [authorized, setAuthorized] = useState(false);
    const [submitTask] = useMutation(SUBMIT_TASK);
    const [entry, setEntry] = useState(null);
    const [currentEntry, setCurrentEntry] = useState(null)

    const submitTaskForm = e => {
        e.preventDefault();
        const bundledTaskMutation = {
            task_id: task.task_id,
            submission: {
                CIC: entry
            }
        }
        submitTask({ variables: { input: bundledTaskMutation } }).then((e) => {
            setCurrentEntry(entry)
        }).catch(e => console.log(e))
    }

    useEffect(() => {

        const taskStudentID = parseInt(task.student_id)
        if (currentStudentId === taskStudentID) {
            setAuthorized(true);
            console.log(task)
            if (task.submission) {
                setCurrentEntry(task.submission.CIC)
            }
        }
    }, [task])

    return (
        <Fragment>
            {authorized ? (
                <div className="CIC-container">
                    <div className="task-CIC-fill-in">
                        <h1>Caption the image!</h1>
                        <p>Caption: {entry ? entry : currentEntry ? currentEntry : ' '}</p>
                        <form onSubmit={submitTaskForm}>
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
                    <SidebarTodo student_id={currentStudentId} />
                    </div>) : null
            }
        </Fragment>
    )
}