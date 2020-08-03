import React, {useState, useEffect} from 'react'; 
import '../../styles/autotask.styl'

export default function AutoTask(props) {
    console.log(props)
    const [students] = useState(props.students);
    let stuff = []
    let count = 0

    useState(() => {
        console.log(stuff)

    }, [stuff])
    
    const allowDrop = e => {
        e.preventDefault();
    }
    const drag = (e) => {
        e.dataTransfer.setData('text', e.target.id)
    }

    const drop = (e) => {
        e.preventDefault();
        let data = e.dataTransfer.getData('text');
        let dataCopy = (document.getElementById(data).cloneNode(true) as HTMLBodyElement) ;
        stuff.push(e.target.id)
        dataCopy.className = "tasktype"
        dataCopy.id = "tasktypeid" + count++;
        dataCopy.ondragstart = e => drag(e);
        e.target.appendChild(dataCopy)
    }

    const dropEat = e => {
        e.preventDefault();
        let data = e.dataTransfer.getData('text');
        let theElement = document.getElementById(data)
        theElement.remove()
    }
    return(<div className="auto-task-container">

        <div className="left-column" onDrop={e => dropEat(e)} onDragOver={e=> allowDrop(e)}>
            Choose tasks 
            <p id="drag1" draggable="true" onDragStart={e => drag(e)}>Move Me</p>
        </div>

        <div className="right-column">
            
            {students.map((student, key) => {
                return <div key={key}>
                    <div>{student.name} | {student.grade}</div>
                    <div id={student.student_id} className="open-area" onDrop={e => drop(e)} onDragOver={e =>allowDrop(e)}>

                    </div>
                    </div>
            })}
        </div>
    </div>)

}