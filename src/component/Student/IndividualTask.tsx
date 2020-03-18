import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getTaskByID } from '../../query/query';
import { cookieParser } from '../../helpers';
const currentStudentId = parseInt(cookieParser('student_id', true));
import LoadingCloud from '../index/LoadingCloud';
import TaskCIC from './task_CIC';

export default function IndividualTask() {
    const taskid = window.location.href.split('=')[1];
    const { loading, error, data } = useQuery(getTaskByID, { variables: { task_id: taskid } })
    const [task, setTask] = useState(null);
    const [authorized, setAuthorized] = useState(false)
    useEffect(() => {
        if (data) {
            console.log(data)

            setTask(data.getTaskByID)
            const dataStudentId = parseInt(data.getTaskByID.student_id)
            if (currentStudentId === dataStudentId) {
                setAuthorized(true)
            }
        }
    }, [data])

    return (
        <Fragment>
            {loading ? <LoadingCloud /> : data && authorized &&
                <Fragment>
                    {task.task_code === "CIC" && 
                    <TaskCIC task={task}/>}
                </Fragment>
            }
        </Fragment>
    )
}