import React, { useState, useEffect, Fragment} from 'react';
import { getStudentInfo } from '../../query/query';
import { useHistory } from 'react-router-dom';
import IndividualStudentBlog from '../teacher-student-shared/IndieStudentBlog';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { UPDATE_MESSAGE, SHARE_STUDENT } from '../../mutation/mutation';
import '../../styles/teacher_dashboard_student.styl';
const noPic = require('../../img/no-pic.png')
import { TeacherContext } from '../index/Context';
import { getBasicByEmail } from '../../query/query';

interface StudentProfileProps {

  teacher_id: number,
  student_id: string
}
function ShareStudent(props) {
  let [userEmail, { data }] = useLazyQuery(getBasicByEmail);
  const [other, setOther] = useState(null)
  const [submitShareStudent] = useMutation(SHARE_STUDENT);
  const [teachid, setteachid] = useState(null)

  const whichTeacher = async e => {
    await userEmail({ variables: { search: e } })
  }

  useEffect(() => {
    if (data) {
      setOther(data.getUserByUnknown)
    } else {
      setOther(null)
    }
  }, [whichTeacher])


  const shareStudent = e => {
    e.preventDefault();
    const shareToStudent = {
      shared: [{
        student_id: props.student_id,
        identifier: props.student.identifier,
        username: props.student.username,
      }]
    }

    submitShareStudent({variables: {input: {id: parseInt(teachid), share: shareToStudent, student_id: props.student_id}}}).catch((err) => console.log(err))

  }

  return (
    <form onSubmit={shareStudent}>
      <label><p>Enter the the user you want to share this student with.</p>
        <input id="share" onChange={e => whichTeacher(e.target.value)} />
        {other &&
          <select className="full-width" name="which-teacher" id="which-teacher" onChange={e => setteachid(e.target.value)}>
            <option value=""></option>
            {other.map((teach, key) =>
              <option value={teach.id} key={key}>{teach.id} {teach.username} ({teach.email})</option>)}
          </select>}

        <button type="submit">Share Student</button>
      </label>
    </form>
  )

}

function StudentProfile(props: StudentProfileProps) {
  const studentid = parseInt(props.student_id)
  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: studentid } });
  const [updateMessage] = useMutation(UPDATE_MESSAGE);
  const [message, setMessage] = useState(null);
  const [share, setShare] = useState(false);
  const history = useHistory();
  



  const submitMessage = e => {
    e.preventDefault();
    updateMessage({ variables: { input: { student_id: props.student_id, message: message } } })
      .then(() => {
        history.push('/dashboard');
      }).catch((err) => console.log(err));
  };
  useState(() => {
    if (!props.student_id) {
      history.push('/dashboard')
    }
  })


  return (
    <Fragment>
      {data &&

        <div className="individual-student">

          <div className="avatar">
            <img className="avatar-image" src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : noPic} alt="Student's avatar" />
          </div>
          <center><h1>{data.getStudentByID[0].name}</h1></center>

          <button onClick={e => setShare(true)}>Share User</button>
          {share && <ShareStudent student={data.getStudentByID[0]} student_id={props.student_id}/>}
          <form onSubmit={submitMessage}>
            <label htmlFor="message">
              <h2>Welcome Message</h2></label>
            <input id="message" placeholder={message ? message : (data.getStudentByID[0].message) ? data.getStudentByID[0].message : 'enter a message for ' + data.getStudentByID[0].name} onChange={e => setMessage(e.target.value)} />
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
          {/* <h2>Blogs</h2>  ***DISABLE BLOG UNTIL WE FIGURE OUT WHAT TO DO WITH IT***
          {data.getStudentByID[0].blogs.length > 0 ? data.getStudentByID[0].blogs.map((blog, key) => {

            return <IndividualStudentBlog
              key={key}
              blog_id={blog.blog_id}
              index={key}
              subject={blog.subject}
              content={blog.content}
              comments={blog.comments}
              teacher_id={props.teacher_id} />;
          }) : 'No Blog'} */}
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
          <div>
            <StudentProfile
              teacher_id={props.teacher_id}
              student_id={context.student_id} />
          </div>
        )}
      </TeacherContext.Consumer>

    </Fragment>
  );
}