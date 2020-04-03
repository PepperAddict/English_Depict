import React, { useState, useEffect, Fragment } from 'react';
import { cookieParser } from '../../helpers';
import LoadingCloud from '../index/LoadingCloud';
import TaskCIC from './task_CIC';

export default function IndividualTask(props) {
    const [task, setTask] = useState(props.content);

    return (

        <Fragment>
            {task.task_code === "CIC" &&
                <TaskCIC task={task} />}
        </Fragment>

    )
}