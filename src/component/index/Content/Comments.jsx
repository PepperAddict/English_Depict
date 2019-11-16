import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getBlogByID, getStudentInfoSimple, getUserByIDSimple } from '../../../query/query';
import { ADD_COMMENT} from '../../../mutation/mutation'
import ViewBlogs from '../ViewBlogs.jsx';
import moment from 'moment';

function CommentContent(props) {

  const handleMenu = (e) => {
    props.addVocabulary(e.target.innerHTML);
  }
  const [commentArray, setComment] = useState(props.content.split(' '))
  return (<p>
    {commentArray.map((indi, key) => {
      return <span className="blog-content" onClick={handleMenu} key={key}>{indi}</span>
    })}
  </p>)
}


function CommentAuthorTeacher(props) {
  const {loading, error, data} = useQuery(getUserByIDSimple, {variables: {userId: props.teacher_id}})

  return ( <Fragment>
     {data ? <p>Commented by <strong>{data.getUser.username}</strong> on <strong>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</strong></p> : null}
  </Fragment>)
}

function CommentAuthorStudent(props) {
  const { loading, error, data } = useQuery(getStudentInfoSimple, { variables: { student_id: props.student_id } })
  
  return ( <Fragment>
    {data ? <p>Commented by <strong>{data.getStudentByID[0].name}</strong> on <strong>{moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</strong></p> : null}
  </Fragment>)
}

export default function EditBlog(props) {

  const [blog_id, setBlog_id] = useState(window.location.pathname.split('=')[1])
  const [comment, setComment] = useState({})
  const [addComment, { commentData }] = useMutation(ADD_COMMENT);
  const { loading, error, data } = useQuery(getBlogByID, { variables: { blog_id: blog_id } })


  const submitChanges = e => {
    e.preventDefault();
    console.log(data.getBlogByID[0].blog_id);
    console.log(props.student_id)
    console.log(comment)
    if (props.student_id) {
      addComment({variables: {input: {
        blog_id: data.getBlogByID[0].blog_id, 
        student_id: props.student_id, 
        content: comment
      }}}).then((e) => {
        location.reload();
      })
    }
  }

  const updateFields = e => {
    setComment({
      ...comment, [e.target.name]: e.target.value || ''
    })
  }


  return (
    <div className="blog-container-comment">
      <h2>You are modifying this blog entry</h2>
      {loading ? 'loading' : error ? 'error' : data ? (
        <Fragment>
          <label htmlFor="subject">Subject</label>
          <div id="subject">{data.getBlogByID[0].subject}</div>
          <label htmlFor="content">Content</label>

          <div id="content">
            {data.getBlogByID[0].content}
          </div>
          {data.getBlogByID[0].comments.length === 1 ? '1 Comment' : data.getBlogByID[0].comments.length > 1 ? data.getBlogByID[0].comments.length + ' Comments' :data.getBlogByID[0].comments.length === 0 && 'No Comments'}
          {data.getBlogByID[0].comments.length >= 1 && data.getBlogByID[0].comments.map((comments, key) => {
          return <div key={key} index={key} className="comment">
            <CommentContent addVocabulary={props.addVocabulary} content={comments.content}/>
          {comments.student_id ?<CommentAuthorStudent student_id={comments.student_id} date={comments.created_at}/>
          : <CommentAuthorTeacher teacher_id={comments.teacher_id} date={comments.created_at} />}
          </div>
          })}
          <form onSubmit={submitChanges}>
            <label htmlFor="add-comment">Add Comment</label>
            <textarea id="add-comment" onChange={e => setComment(e.target.value)} />
            <button className="blog-button" type="submit">Submit Comment</button>
          </form>
        </Fragment>
      ) : <ViewBlogs student_id={props.student_id}/>}
    </div>
  )
}