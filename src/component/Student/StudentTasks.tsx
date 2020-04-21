import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { StudentContext } from '../index/Context';
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
        <StudentContext.Consumer>
            {context => (
                
                <Link to="/student/tasks/task">
                    <div className="task-container" onClick={e => context.setTask(tasks)}>
                        {tasks.task_code === "CIC" &&
                            <CIC task={tasks} />}
                    </div>
                </Link>
            )}
        </StudentContext.Consumer>
    )
}

export default function StudentTasks(props) {
    return (

        <div>
            {props.tasks.map((content, key) => {
                return < Task key={key} content={content} setTask={props.setTask} />
            })}
        </div>
    )
}