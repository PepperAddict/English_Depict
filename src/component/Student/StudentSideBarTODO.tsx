import React, {useState, useEffect, Fragment} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getAllTasksByStudentID} from '../../query/query';
import '../../styles/tasks.styl'

export default function SideBarTodo(props) {
    const {loading, error, data} = useQuery(getAllTasksByStudentID, {variables: {student_id: props.student_id}})
    if (data) {
        console.log(data)
    }
    
    return (
        <div className="todo-sidebar">
            <h2>Tasks</h2>
            {data &&
            data.getTasksByStudentID.map((entry, index) => {
                if (entry.task_code === "CIC" && !entry.accepted) {
                    return (
                    <div key={index} index={index}><img src={entry.entry.clue_image.urls.thumb} /></div>
                    )
                }
            })}
        </div>
    )
}