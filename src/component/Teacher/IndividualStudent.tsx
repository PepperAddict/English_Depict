import React, { useState, useEffect, Fragment } from 'react';
import { getStudentInfo } from '../../query/query';
import IndividualStudentBlog from '../teacher-student-shared/IndieStudentBlog';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_MESSAGE } from '../../mutation/mutation';
import '../../styles/teacher_dashboard_student.styl';
const noPic = require('../../img/no-pic.png')
import { TeacherContext } from '../index/Context';
interface StudentProfileProps {

  teacher_id: number,
  student_id: string
}

function StudentProfile(props: StudentProfileProps) {
  const studentid = parseInt(props.student_id)
  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: studentid } });
  const [updateMessage] = useMutation(UPDATE_MESSAGE);
  const [message, setMessage] = useState(null);

  const submitMessage = e => {
    e.preventDefault();
    updateMessage({ variables: { input: { student_id: props.student_id, message: message } } })
      .then(() => {
        location.reload();
      }).catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {data &&

        <div className="individual-student">

          <div className="avatar">
            <img className="avatar-image" src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : noPic} alt="Student's avatar" />
          </div>
          <center><h1>{data.getStudentByID[0].name}</h1></center>
          <form onSubmit={submitMessage}>
        <label htmlFor="message">
          <h2>Welcome Message</h2></label>
        <input id="message" defaultValue={message ? message : 'enter a message for ' + data.getStudentByID[0].name} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Submit Message</button>
      </form>
          <h2>Vocabulary Words</h2>
          <ul className="vocabulary-list">
            {data.getStudentByID[0].vocabularies.length > 0 ? data.getStudentByID[0].vocabularies.map((words, key) => {
              return <li key={words.vocab_id} index={key}>{words.vocabulary_word}</li>;
            }) : 'No Vocabulary'}
          </ul>

          <div className="containers">
            {data.getStudentByID[0].tasks.map((task, index) => {
              if (!task.accepted && task.task_code == "CIC") {
                return <div key={index}>
                  Caption the image
                <img src={task.entry.clue_image.urls.thumb} alt={task.entry.clue_image.alt_description} />
                  <p>{task.submission ? task.submission.CIC : 'not yet completed'}</p>
                </div>
              }
            })}

          </div>
          <h2>Blogs</h2>
          {data.getStudentByID[0].blogs.length > 0 ? data.getStudentByID[0].blogs.map((blog, key) => {

            return <IndividualStudentBlog
              key={key}
              blog_id={blog.blog_id}
              index={key}
              subject={blog.subject}
              content={blog.content}
              comments={blog.comments}
              teacher_id={props.teacher_id} />;
          }) : 'No Blog'}
        </div>}
    </Fragment>

  );
}

interface IndividualStudentProps {
  data: any,
  teacher_id: number,
  student_id: number
}

export default function IndividualStudent(props: IndividualStudentProps) {
  const pathname = window.location.pathname.split('=');
  const student_id = pathname[pathname.length - 1];

  const [students] = useState(props.data.students);
  const [myStudent, setMyStudent] = useState(false);

  useEffect(() => {
    //only show student information if student id is in teacher's student list 
    for (let x of students) {
      if (x.student_id === student_id) {
        setMyStudent(true);
        break;
      }
    }
  }, []);

  return (
    <Fragment>
      <TeacherContext.Consumer>
        {context => (

          <div>{console.log(context)}
            <StudentProfile

              teacher_id={props.teacher_id}
              student_id={context.student_id} />
          </div>
        )}
      </TeacherContext.Consumer>

    </Fragment>
  );
}