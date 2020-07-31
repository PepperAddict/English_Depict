import React, { useState, useEffect, Fragment } from 'react';
import { getStudentInfo } from '../../query/query';
import { useHistory, Redirect } from 'react-router-dom';
import IndividualStudentBlog from '../teacher-student-shared/IndieStudentBlog';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import { UPDATE_MESSAGE, SHARE_STUDENT, UPDATE_IDENTIFIER, UPDATE_STUDENT_AVATAR, REMOVE_STUDENT } from '../../mutation/mutation';
import '../../styles/teacher_dashboard_student.styl';
const noPic = require('../../img/no-pic.png')
import { TeacherContext } from '../index/Context';
import { getBasicByEmail } from '../../query/query';
import Unsplash from 'unsplash-js';
import { animalList } from '../../../server/utils/lists'

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

    submitShareStudent({ variables: { input: { id: parseInt(teachid), share: shareToStudent, student_id: props.student_id } } }).catch((err) => console.log(err))

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
  const [updateIdentifier] = useMutation(UPDATE_IDENTIFIER);
  const [updateAvatar] = useMutation(UPDATE_STUDENT_AVATAR);
  const [removeStudent] = useMutation(REMOVE_STUDENT)
  const [message, setMessage] = useState(null);
  const [share, setShare] = useState(false);
  const history = useHistory();
  const [showAvatars, setShowAvatar] = useState(false);
  const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS });
  const [listem, setlistem] = useState([])
  const [identifierChange, setIdentifierChange] = useState(false);
  const [avatar, setNewAvatar] = useState(null);
  const [identifier, setNewIdentifier] = useState(null)


  const setAvatar = e => {
    (data) &&
      setShowAvatar(true)
    unsplash.search.photos(`animal ${(identifier) ? identifier : data.getStudentByID[0].identifier}`, 2, 20).then((res) => {
      return res.json();
    }).then((response) => {
      setlistem(response.results)
    })

  }

  const submitAvatar = (e, data) => {
    e.preventDefault();
    const chosenImage = data.urls.small;
    updateAvatar({ variables: { input: { student_id: props.student_id, avatar: chosenImage } } })
    .then(() => {
      setNewAvatar(chosenImage)
      setShowAvatar(false)
    }).catch((err) => console.log(err));
  }

  const submitMessage = e => {
    e.preventDefault();
    updateMessage({ variables: { input: { student_id: props.student_id, message: message } } })
      .then(() => {
        history.push('/parent-dashboard');
      }).catch((err) => console.log(err));
  };


  const chosenIdentifier = (e) => {
    setIdentifierChange(e);
    updateIdentifier({ variables: { input: { student_id: props.student_id, identifier: e } } })
    .then(() => {
      setNewIdentifier(e)
      setIdentifierChange(false)
    }).catch((err) => console.log(err));
  }

  const setRemoveStudent = e => {
    e.preventDefault();
    const conf = confirm('Are you sure you want to remove ' + data.getStudentByID[0].name);
    if (conf === true) {
      console.log('you said yes')
    } 
    removeStudent({ variables: { student_id: props.student_id} })
    .then(() => {
      window.location.replace('/parent-dashboard')
    }).catch((err) => console.log(err));

  }

  return (
    <Fragment>
      {props.student_id ? 
        data &&

        <div className="individual-student">
          <button onClick={e => setRemoveStudent(e)}>Remove Student</button>
          <button onClick={e => window.location.href = "/parent-dashboard"}>Save</button>
          <center><h1>{data.getStudentByID[0].name}</h1></center>
          <div className="avatar" onClick={e => setAvatar(e)}>
            <img className="avatar-image" src={avatar ? avatar : data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : noPic} alt="Student's avatar" />
          </div>

          <p>Unique Identifier: </p>
          {(identifierChange) ? (
            <select onChange={e => chosenIdentifier(e.target.value)}>
              <option value={(identifier) ? identifier : data.getStudentByID[0].identifier}>{data.getStudentByID[0].identifier}</option>
              {animalList.map((animal, key) => <option value={animal} key={key}>{animal}</option>)}

            </select>
          ) : <p onClick={() => setIdentifierChange(true)}>{identifier ? identifier : data.getStudentByID[0].identifier}</p>}
          {(showAvatars) &&
            <div className="avatar-choose">{listem.map((imgData, key) => <img onClick={e => submitAvatar(e, imgData)} key={key} src={imgData.urls.thumb} alt={imgData.alt_description} />)}
            </div>}

          

          {/* <button onClick={e => setShare(true)}>Share User</button> */}
          {share && <ShareStudent student={data.getStudentByID[0]} student_id={props.student_id} />}
          <form className="submit-message" onSubmit={submitMessage}>
            <label htmlFor="message">
              <h2>Message</h2></label>
            <input id="message" placeholder={message ? message : (data.getStudentByID[0].message) ? data.getStudentByID[0].message : 'enter a message for ' + data.getStudentByID[0].name} onChange={e => setMessage(e.target.value)} />
            <button type="submit">Send Message</button>
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
                  <h3>Caption the image</h3>
                  <img src={task.entry.clue_image.urls.thumb} alt={task.entry.clue_image.alt_description} />
                  <p>{task.submission ? task.submission.CIC : 'not yet completed'}</p>
                </div>
              } else if (!task.accepted && task.task_code == "WOTD") {
                return <div key={index}>
                  <h3>Word of the Day </h3>
                  <p>WOTD: {task.entry.word} | {task.entry.sentence}</p>
                  <p>{task.submission ? task.submission.WOTD.sentence : 'not yet completed'}</p>
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
        </div> : <Redirect to="/parent-dashboard" />}
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