import React, { useState, Fragment } from 'react';

function CIC(props) {
    const [tasks] = useState(props.task)
    console.log(tasks)
    return (
    <div className="task-CIC">
        <a href={`/todo/task?=${tasks.task_id}`}>
            <img src={tasks.entry.clue_image.urls.thumb} alt={tasks.entry.clue_image.alt_description} />
        </a>
    </div>
    )
}

//Only show the tasks that are not accepted

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