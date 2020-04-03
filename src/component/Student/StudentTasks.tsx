import React, { useState, Fragment, useEffect } from 'react';

function CIC(props) {
    const [tasks] = useState(props.task);


    return (
    <div className="task-CIC">
        {/* <a href={`/todo/task?=${tasks.task_id}`}> */}
            <img src={tasks.entry.clue_image.urls.thumb} alt={tasks.entry.clue_image.alt_description} onClick={ e => props.setSelectedTask(tasks)} />
        {/* </a> */}
    </div>
    )
}

//Only show the tasks that are not accepted

function Task(props) {
    const [tasks] = useState(props.content);
    const [selectedTask, setSelectedTask] = useState(null)

    if (selectedTask) {
        console.log(selectedTask)
    }

    return (
        <Fragment>
            {!tasks.accepted ? 
            <div className="task-container">
                {tasks.task_code === "CIC" &&
                <CIC task={tasks} setSelectedTask={setSelectedTask}/>}
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