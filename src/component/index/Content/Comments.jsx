import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getBlogByID, getStudentInfoSimple, getUserByIDSimple } from '../../../query/query';
import { ADD_COMMENT } from '../../../mutation/mutation';
import ViewBlogs from './ViewBlogs.jsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import BlogContent from './BlogContent.jsx';

CommentContent.propTypes = {
  addVocabulary: PropTypes.func,
  content: PropTypes.string

};

function CommentContent(props) {

  const handleMenu = (e) => {
    props.addVocabulary(e.target.innerHTML);
  };
  const [commentArray] = useState(props.content.split(' '));
  return (<p>
    {commentArray.map((indi, key) => {
      return <span className="blog-content" role="button" tabIndex={key} onClick={handleMenu} onKeyDown={handleMenu} key={key}>{indi}</span>;
    })}
  </p>);
}

CommentAuthorTeacher.propTypes = {
  teacher_id: PropTypes.string,
  date: PropTypes.string,
};
function CommentAuthorTeacher(props) {
  const { loading, error, data } = useQuery(getUserByIDSimple, { variables: { userId: props.teacher_id } });

  return (<Fragment>
    {data ? <p>Commented by <strong>{data.getUser.username}</strong> on <strong>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</strong></p> : null}
  </Fragment>);
}

CommentAuthorStudent.propTypes = {
  student_id: PropTypes.string,
  date: PropTypes.string
};

function CommentAuthorStudent(props) {
  const { loading, error, data } = useQuery(getStudentInfoSimple, { variables: { student_id: props.student_id } });

  return (<Fragment>
    {data ? <p>Commented by <strong>{data.getStudentByID[0].name}</strong> on <strong>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</strong></p> : null}
  </Fragment>);
}

EditBlog.propTypes = {
  student_id: PropTypes.string,
  addVocabulary: PropTypes.func,

};

export default function EditBlog(props) {

  const [blog_id] = useState(window.location.pathname.split('=')[1]);
  const [comment, setComment] = useState({});
  const [addComment] = useMutation(ADD_COMMENT);
  const { loading, error, data } = useQuery(getBlogByID, { variables: { blog_id: blog_id } });


  const submitChanges = e => {
    e.preventDefault();
    console.log(data.getBlogByID[0].blog_id);
    console.log(props.student_id);
    console.log(comment);
    if (props.student_id) {
      addComment({
        variables: {
          input: {
            blog_id: data.getBlogByID[0].blog_id,
            student_id: props.student_id,
            content: comment
          }
        }
      }).then(() => {
        location.reload();
      });
    }
  };

  return (
    <div className="blog-container-comment">
      {loading ? 'loading' : error ? 'error' : data ? (
        <Fragment>
          <div className="blog-entry">
            <h2>{data.getBlogByID[0].subject}</h2>
            
            <BlogContent content={data.getBlogByID[0].content} addVocabulary={props.addVocabulary}/>
          </div>
          {data.getBlogByID[0].comments.length === 1 ? '1 Comment' : data.getBlogByID[0].comments.length > 1 ? data.getBlogByID[0].comments.length + ' Comments' : data.getBlogByID[0].comments.length === 0 && 'No Comments'}
          {data.getBlogByID[0].comments.length >= 1 && data.getBlogByID[0].comments.map((comments, key) => {
            return <div key={key} index={key} className="blog-comment">
              <CommentContent addVocabulary={props.addVocabulary} content={comments.content} />
              {comments.student_id ? <CommentAuthorStudent student_id={comments.student_id} date={comments.created_at} />
                : <CommentAuthorTeacher teacher_id={comments.teacher_id} date={comments.created_at} />}
            </div>;
          })}
          <form onSubmit={submitChanges}>
            <label htmlFor="add-comment">Add Comment</label>
            <textarea id="add-comment" onChange={e => setComment(e.target.value)} />
            <button className="blog-button" type="submit">Submit Comment</button>
          </form>
        </Fragment>
      ) : <ViewBlogs student_id={props.student_id} />}
    </div>
  );
}