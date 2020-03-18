import React, {useState, useEffect, Fragment} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getAllTasksByStudentID} from '../../query/query';
import '../../styles/tasks.styl'

export default function SideBarTodo(props) {
    const {loading, error, data} = useQuery(getAllTasksByStudentID, {variables: {student_id: props.student_id}})
    
    return (
        <div className="todo-sidebar">
            <h2>Tasks</h2>
            {data &&
            data.getTasksByStudentID.map((task, index) => {
                if (task.task_code === "CIC" && !task.accepted) {
                    return (
                    <a key={index} href={"/todo/task?="+task.task_id}><img src={task.entry.clue_image.urls.thumb} /></a>
                    )
                }
            })}
        </div>
    )
}