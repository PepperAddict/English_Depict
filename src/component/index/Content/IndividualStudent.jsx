import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getStudentInfo } from '../../../query/query';
import Comments from './TeacherBlogComments.jsx';
import { ADD_COMMENT,  UPDATE_MESSAGE} from '../../../mutation/mutation';
import PropTypes from 'prop-types';

AddComment.propTypes = {
  blog_id: PropTypes.number,
  teacher_id: PropTypes.number
};

function AddComment(props) {
  const [addComment] = useMutation(ADD_COMMENT);
  const [content, setContent] = useState('');
  const submit = e => {
    e.preventDefault();
    const commentInfo = {
      blog_id: props.blog_id,
      student_id: null,
      teacher_id: parseInt(props.teacher_id),
      content: content
    };
    addComment({ variables: { input: commentInfo } }).then(() => {
      location.reload();
    }).then((err) => {
      console.log(err);
    });
  };
  return (<form onSubmit={submit}>
    <label htmlFor="add-comment">Add Comment</label>
    <textarea id="add-comment" onChange={e => setContent(e.target.value)} />
    <button type="submit">submit comment</button>
  </form>);
}

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
    updateMessage({variables: {input: {student_id: props.student_id, message: message}}})
    .then(() => {
      location.reload();
    }).catch((err) => {
      console.log(err)
    })
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
        const blog_id = parseInt(blog.blog_id);
        return <div key={blog.blog_id} index={key}><b>{blog.subject}</b><p>{blog.content}</p>
          {blog.comments.length > 0 &&
            <Comments comments={blog.comments} />}
          <AddComment blog_id={blog_id} teacher_id={props.teacher_id} />
        </div>;
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

  const [students, setStudents] = useState(props.data.students);
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