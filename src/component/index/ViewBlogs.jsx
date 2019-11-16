import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAllBlogs } from '../../query/query';
import { getStudentInfo } from '../../query/query';
import moment from 'moment';



function ContentButtons(props) {

const handleMenu = (e, data) => {
  //send selected word to dashboard to figure out what to do with it
  props.addVocabulary(e.target.innerHTML)
}
  let contentArray = props.content.split(' ')

  return (
    <div className="blog-content-container">
      {contentArray.map((content, index) => {
        return <span className="blog-content" onClick={handleMenu} id="blog-vocab" key={index} index={index}> {content} </span>
      })}
    </div>
  )
}

function IndividualBlog(props) {
  let author = props.student_id;
  let student = props.student_id;
  const time = props.blog.created_at;

  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: parseInt(author) } })

  return (
    <div className={data ? author === student ? 'blog students-blog' : 'blog' : 'blog'}>
      <div className="date">{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</div>
      <h2>{props.blog.subject} </h2>
      <ContentButtons content={props.blog.content} addVocabulary={props.addVocabulary}/>
      <div className="author">Written by {data &&  <span className="avatar"><img className="avatar-image"src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : 'none'} /> </span>} {data ? data.getStudentByID[0].name == null ? data.getStudentByID[0].username : data.getStudentByID[0].name : 'Unknown'}</div>
      {props.editMe && <div className="edit"><a href={"/student/edit-blog="+ props.blog.blog_id}>Edit Blog</a></div>}
      <a href={"/student/view-comments="+ props.blog.blog_id}>{props.comment.length === 0 ? '0 Comments': props.comment.length === 1 ? '1 Comment' : props.comment.length > 0 && props.comment.length + ' Comments'}</a>
    </div>
  )
}


function ShowPosts(props) {
  //All blog posts 
  const thestudent = props.student_id;
  
  return (
    <div className="student_blogs">
      {props.blog.map((blog, index) => {
        return <IndividualBlog editMe={true} comment={blog.comments} key={index} index={index} blog={blog} student_id={thestudent} addVocabulary={props.addVocabulary}/>
      })}

    </div>
  )
}

export default function ViewBlogs(props) {
  const [studentOnly, setStudentOnly] = useState(false)
  const [blog, setDate] = useState(props.blogs)


  return (
    <div> 
      <ShowPosts blog={blog} date={blog.created_at} student_id={props.student_id} addVocabulary={props.addVocabulary} />
    </div>
  )
}