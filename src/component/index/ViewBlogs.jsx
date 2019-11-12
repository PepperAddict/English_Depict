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
  let author = props.blog.student_id;
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
    </div>
  )
}
function ShowStudentPosts(props) {
  //Blog posts for student
  const thestudent = props.student_id;
  const [editMe, seteditMe] = useState(true)
  let studentArray = new Array();
  for (let x of props.blog) {
    if (x.student_id === thestudent) {
      studentArray.push(x)
    }
  }
  return (
    <div className="student_blogs">
      {studentArray.map((blog, index) => {
        return <IndividualBlog editMe={editMe} key={index} index={index} blog={blog} student_id={thestudent} addVocabulary={props.addVocabulary}/>
      })}

    </div>
  )
}

function ShowPosts(props) {
  //All blog posts 
  const thestudent = props.student_id;
  
  return (
    <div className="student_blogs">
      {props.blog.map((blog, index) => {
        return <IndividualBlog key={index} index={index} blog={blog} student_id={thestudent} addVocabulary={props.addVocabulary}/>
      })}

    </div>
  )
}

export default function ViewBlogs(props) {
  const [studentOnly, setStudentOnly] = useState(false)
  const [buttonText, setButtonText] = useState('View Your Blogs Only')
  const { loading, error, data } = useQuery(getAllBlogs);
  const allOrIndi = e => {
    e.preventDefault();
    e.target.value = 'cheese'
    if (studentOnly === false) {
      setButtonText('View All Blogs')
      setStudentOnly(true)
    } else {
      setButtonText('View Your Blogs Only')
      setStudentOnly(false)
    }

  }
  return (
    <div> <div><button onClick={allOrIndi} >{buttonText}</button>  </div>
    {loading ? 'loading' : error ? 'error' : data && !studentOnly? (
      <ShowPosts blog={data.getCompleteBlogs} student_id={props.student_id} addVocabulary={props.addVocabulary} />
    ) : data && studentOnly && (
      <ShowStudentPosts blog={data.getCompleteBlogs} student_id={props.student_id} addVocabulary={props.addVocabulary} />
    )}</div>
  )
}