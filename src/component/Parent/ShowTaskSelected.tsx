import React, { useState, useEffect, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { REJECT_OR_APPROVE_TASK } from '../../mutation/mutation';
import { Link } from 'react-router-dom'

export default function SelectedTaskView(props) {
    const [task] = useState(props.currentTask);
    const [reject, setReject] = useState(false);
    const [message, setMessage] = useState(null);
    const [completeTask] = useMutation(REJECT_OR_APPROVE_TASK);

    const approveSubmission = e => {
        e.preventDefault();
        setReject(false)
        completeTask({ variables: { input: { task_id: task.task_id, accepted: true } } }).then((e) => {
            props.setShowTask(false);
        })

    }
    const rejectSubmission = e => {
        e.preventDefault();
        setReject(true)
    }

    const submitRejection = e => {
        e.preventDefault();
        completeTask({ variables: { input: { task_id: task.task_id, message: message } } }).then((e) => {
            props.setShowTask(false)
        })

    }

    return (
        <div className="individual-task-modify">
            {(props.currentTask) && (
                <Fragment>
                    {(task.task_code === "CIC") ? (<Fragment>
                        <img src={task.entry.clue_image.urls.small} />
                        <p>Student Input: {task.submission ? task.submission.CIC : 'not yet completed'}. </p>

                    </Fragment>) : (task.task_code === "WOTD") && (
                        <Fragment>
                            <p>Word: {task.entry.word}</p>
                            <p>example Sentence: {task.entry.sentence}</p>
                            <p>Student Input: {task.submission ? task.submission.WOTD : 'not yet completed'}.</p>
                        </Fragment>
                    )}

                    {typeof task.completed_at === 'string' && (<Fragment>
                        <button onClick={approveSubmission}>Approve Submission</button>
                        <button onClick={rejectSubmission}>Reject Submission</button>
                    </Fragment>

                    )}

                    {reject &&
                        <form onSubmit={submitRejection}>
                            <label htmlFor="reject-message">Would you like to add a message as to why you're rejecting this submission?
          <input id="reject-message" name="reject-message" onChange={e => setMessage(e.target.value)} />
                            </label>
                            <button type="submit">Submit Rejection</button>
                        </form>
                    }
                    <Link to="/parent-dashboard/task"><button>go back</button></Link>

                </Fragment>

            )}



        </div>
    )

}