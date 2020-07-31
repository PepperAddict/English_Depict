import React, { useState, useEffect, Fragment } from 'react';
import Doughnut from './doughnut';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { TeacherContext } from '../index/Context'

function TaskStudentList(props) {
    return (
        <TeacherContext.Consumer>
            {context => (
                <Fragment>
                    <h3>{moment(new Date(props.data.date)).format('dddd, MMMM D')}</h3>
                    <Doughnut chart={props.data.forChart} use={props.data.id} />
                    <span>students: {
                        props.each.map((x, key) => {
                            return <Link to="/parent-dashboard/task/current" key={key} onClick={e => context.setTask(x)}>{x.student_name} : {(!x.submission) ? "Not Completed Yet" : x.submission + ' | waiting for review'}</Link>
                        })
                    }</span>
                </Fragment>
            )}
        </TeacherContext.Consumer>

    )
}

function EmptyTask(props) {
    return (
        <div id={(props.type === "Image Clue") ? "cic-task" : "wotd-task"} className="show-when-empty">
            <p>
                There are no {props.type} tasks. 
            </p>
            <Link to="/parent-dashboard/task">
                <button className="blue-button">Add Tasks</button>
            </Link>
        </div>
    )
}


export default function IndividualTask(props) {
    const [cictasks, setcic] = useState([])
    const [wotdtasks, setwotdtasks] = useState([])

    useEffect(() => {
        let wotd = []
        let cic = []
        for (let x of props.task) {

            if (x.task === "WOTD") {
                wotd.push(x)

            } else if (x.task === "CIC") {
                cic.push(x)
            }

        }
        setcic(cic)
        setwotdtasks(wotd)

    }, [])


    return (


        // <div id={(props.type === "CIC") ? "cic-task" : "wotd-task"}>
        <Fragment>
            {wotdtasks.length > 0 ? <div id="wotd-task">
                <h2>Word of the Day (Sight Words)</h2>
                <div className="individual-task-container">
                {wotdtasks.map((ft, key) => {
                    if (ft.forChart.finished !== ft.forChart.inall) {
                        return <div className="individual-task" key={key} >
                            <TaskStudentList each={ft.tasks} data={ft} setShowTask={props.setShowTask} />

                            <p>word: {ft.id}</p>
                            <p>Example Sentence: {ft.tasks[0].entry.sentence}</p>
                        </div>
                    }
                })}
                </div>

            </div> : <EmptyTask type="Word of the Day" />}

            {cictasks.length > 0 ? <div id="cic-task">
                <h2>Image Clue (Caption The Image)</h2>
                <div className="individual-task-container">
                {cictasks.map((ft, key) => {
                    if (ft.forChart.finished !== ft.forChart.inall) {
                        return <div className="individual-task" key={key} onClick={e => props.setShowTask(ft.tasks[0])}>
                        <TaskStudentList each={ft.tasks} data={ft} setShowTask={props.setShowTask} />

                        <img src={ft.tasks[0].entry.clue_image.urls.thumb} alt={ft.tasks[0].entry.clue_image.alt_description} />
                    </div>
                    }
                })}
                </div>
            </div> : <EmptyTask type="Image Clue" />}
        </Fragment>

    )

}