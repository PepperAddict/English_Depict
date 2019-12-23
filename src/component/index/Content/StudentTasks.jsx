import React, {useState, Fragment} from 'react';

export default function StudentTasks(props) {
console.log(props)
return (
    <Fragment>
        { props.tasks.map((content, key) => {
        return <p key={key}>{content.task_id}</p>
        })}
    </Fragment>
)
}