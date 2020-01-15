import React, { useState, Fragment } from 'react';

function CIC(props) {
    const [tasks] = useState(props.task)
    return (
    <div>
    <img src={tasks.entry.clue_image.urls.thumb} alt={tasks.entry.clue_image.alt_description} />
    </div>
    )
}

function Task(props) {
    const [tasks] = useState(props.content)

    return (
        <Fragment>
            {!tasks.accepted ? 
            <div>
                {tasks.task_code === "CIC" &&
                <CIC task={tasks}/>}
            </div>
            : null}
        </Fragment>
    )
}

export default function StudentTasks(props) {
    return (
        <Fragment>
            {props.tasks.map((content, key) => {
                return < Task key={key} content={content}/>
            })}
        </Fragment>
    )
}