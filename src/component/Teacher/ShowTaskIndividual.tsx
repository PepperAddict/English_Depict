import React, { useState, useEffect, Fragment } from 'react';
import Doughnut from './doughnut';
import moment from 'moment';

function TaskStudentList(props) {
return (
    <Fragment>
        <h3>{moment(new Date(props.data.date)).format('dddd, MMMM D')}</h3>
    <Doughnut chart={props.data.forChart} use={props.data.id}/>
    <span>students: {
        props.each.map((x, key) => {
            return <p key={key} onClick={e => props.setShowTask(x)}>{x.student_name} : {(!x.submission) ? "Not Completed Yet" : x.submission + ' | waiting for review'}</p>
        })
    }</span>
</Fragment>
)
}


export default function IndividualTask(props) {
    const filteredTask = props.task

    return (
        <Fragment>
            {filteredTask.map((ft, key) => {
                if (ft.task === "WOTD" && ft.forChart.finished !== ft.forChart.inall && props.type === "WOTD") {
                    return <div key={key} >
                        <TaskStudentList each={ft.tasks} data={ft} setShowTask={props.setShowTask}/>
                        
                        <p>word: {ft.id}</p>
                        <p>Example Sentence: {ft.tasks[0].entry.sentence}</p>
                    </div>
                } else if (ft.task === "CIC" && ft.forChart.finished !== ft.forChart.inall && props.type === "CIC") {
                    return <div key={key} onClick={e => props.setShowTask(ft.tasks[0])}>
                  <TaskStudentList each={ft.tasks} data={ft} setShowTask={props.setShowTask}/>
 
                  <img src={ft.tasks[0].entry.clue_image.urls.thumb} alt={ft.tasks[0].entry.clue_image.alt_description} />
                </div>
                }
            })
            }
        </Fragment>
    )

}