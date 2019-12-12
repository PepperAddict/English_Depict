import React, { useState, useEffect, Fragment } from 'react';
import { getStudentInfo } from '../../../query/query';
import PropTypes from 'prop-types';
import IndividualStudentBlog from './IndividualStudentBlog.jsx';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_MESSAGE } from '../../../mutation/mutation';

StudentProfile.propTypes = {
  data: PropTypes.object,
  teacher_id: PropTypes.number,
  student_id: PropTypes.string
};

function StudentProfile(props) {
  const [updateMessage] = useMutation(UPDATE_MESSAGE);
  const [message, setMessage] = useState(props.data.message);

  const submitMessage = e => {
    e.preventDefault();
    updateMessage({ variables: { input: { student_id: props.student_id, message: message } } })
      .then(() => {
        location.reload();
      }).catch((err) => console.log(err));
  }

  return (
    <div>

      <div className="avatar">
        <img className="avatar-image" src={props.data.avatar} alt="Student's avatar" />

      </div>
      <form onSubmit={submitMessage}>
        <label htmlFor="message">Message</label>
        <input id="message" defaultValue={message ? message : 'enter a message for ' + props.data.name} onChange={e => setMessage(e.target.value)} />
        <button type="submit">Submit Message</button>
      </form>
      <h2>Vocabulary Words</h2>
      <ul className="vocabulary-list">
        {props.data.vocabularies.length > 0 ? props.data.vocabularies.map((words, key) => {
          return <li key={words.vocab_id} index={key}>{words.vocabulary_word}</li>;
        }) : 'No Vocabulary'}
      </ul>

      <h2>Blogs</h2>
      {props.data.blogs.length > 0 ? props.data.blogs.map((blog, key) => {

        return <IndividualStudentBlog
          key={key}
          blog_id={blog.blog_id}
          index={key}
          subject={blog.subject}
          content={blog.content}
          comments={blog.comments}
          teacher_id={props.teacher_id} />
      }) : 'No Blog'}
    </div>
  );
}

IndividualStudent.propTypes = {
  data: PropTypes.object,
  teacher_id: PropTypes.number
};

export default function IndividualStudent(props) {
  const pathname = window.location.pathname.split('=');
  const student_id = pathname[pathname.length - 1];

  const [students] = useState(props.data.students);
  const [myStudent, setMyStudent] = useState(false);
  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id } });
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
      {myStudent && data ? <StudentProfile data={data.getStudentByID[0]} teacher_id={props.teacher_id} student_id={student_id} /> : null}
    </Fragment>
  );
}