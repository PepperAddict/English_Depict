import React, { useState, Fragment, useEffect } from 'react';
import { StudentContext } from '../index/Context';
import IndividualTask from './IndividualTask';

function CIC(props) {
    const [tasks] = useState(props.task);


    return (
        <div className="task-CIC">
            <img src={tasks.entry.clue_image.urls.thumb} alt={tasks.entry.clue_image.alt_description} />
        </div>

    )
}

//Only show the tasks that are not accepted

function Task(props) {
    const [tasks] = useState(props.content);

    return (

        <Fragment>
            {!tasks.accepted ?
                <div className="task-container" onClick={props.onClick}>
                    {tasks.task_code === "CIC" &&
                        <CIC task={tasks} />}
                </div>
                : null}
        </Fragment>


    )
}

export default function StudentTasks(props) {
    return (
        <StudentContext.Consumer>
            {context => (
                !context.task ? (
                    <Fragment>
                        {props.tasks.map((content, key) => {
                            return < Task key={key} content={content} onClick={e => context.setTask(content)} />
                        })}
                    </Fragment>
                ) : <IndividualTask content={context.task} />

            )}
        </StudentContext.Consumer>

    )
}