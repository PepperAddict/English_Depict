import React, { useState, useEffect, Fragment } from 'react';
import { getStudentInfo } from '../../query/query';
import IndividualStudentBlog from '../teacher-student-shared/IndieStudentBlog';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_MESSAGE } from '../../mutation/mutation';
import '../../styles/teacher_dashboard_student.styl';
const noPic = require('../../img/no-pic.png')

interface StudentProfileProps {
  data: any, 
  teacher_id: number,
  student_id: string
}

function StudentProfile(props: StudentProfileProps) {
  const [updateMessage] = useMutation(UPDATE_MESSAGE);
  const [message, setMessage] = useState(props.data.message);

  const submitMessage = e => {
    e.preventDefault();
    updateMessage({ variables: { input: { student_id: props.student_id, message: message } } })
      .then(() => {
        location.reload();
      }).catch((err) => console.log(err));
  };

  return (
    <div className="individual-student">
      <div className="avatar">
        <img className="avatar-image" src={props.data.avatar ? props.data.avatar : noPic} alt="Student's avatar" />
      </div>
      <center><h1>{props.data.name}</h1></center>
      <form onSubmit={submitMessage}>
        <label htmlFor="message">
          <h2>Welcome Message</h2></label>
        <input id="message" defaultValue={message ? message : 'enter a message for ' + props.data.name} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Submit Message</button>
      </form>
      <h2>Vocabulary Words</h2>
      <ul className="vocabulary-list">
        {props.data.vocabularies.length > 0 ? props.data.vocabularies.map((words, key) => {
          return <li key={words.vocab_id} index={key}>{words.vocabulary_word}</li>;
        }) : 'No Vocabulary'}
      </ul>

        <div className="containers">
          {props.data.tasks.map((task, index) => {
            if (!task.accepted && task.task_code == "CIC") {
              return <div key={index}>
                Caption the image
                <img src={task.entry.clue_image.urls.thumb} alt={task.entry.clue_image.alt_description}/>
            <p>{task.submission ? task.submission.CIC : 'not yet completed'}</p>
              </div>
            }
          })}

        </div>
      <h2>Blogs</h2>
      {props.data.blogs.length > 0 ? props.data.blogs.map((blog, key) => {

        return <IndividualStudentBlog
          key={key}
          blog_id={blog.blog_id}
          index={key}
          subject={blog.subject}
          content={blog.content}
          comments={blog.comments}
          teacher_id={props.teacher_id} />;
      }) : 'No Blog'}
    </div>
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
  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id } });
  if (data) {
    console.log(data)
  }
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
      {loading ? <p>loading</p> : error ? <p>error</p> : myStudent && data ? 
        <StudentProfile 
          data={data.getStudentByID[0]} 
          teacher_id={props.teacher_id} 
          student_id={student_id} /> : null}
    </Fragment>
  );
}