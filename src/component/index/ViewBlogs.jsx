import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAllBlogs } from '../../query/query';
import { getStudentInfo } from '../../query/query';
import moment from 'moment';
import '../../styles/blog.styl';


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
      <h2>{props.blog.subject} </h2>
      <span>{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</span>
      <ContentButtons content={props.blog.content} addVocabulary={props.addVocabulary}/>
      Author: {data ? data.getStudentByID[0].name == null ? data.getStudentByID[0].username : data.getStudentByID[0].name : 'Unknown'}
    </div>
  )
}

function ShowPosts(props) {
  const thestudent = props.student_id;
  return (
    <div className="student_blogs">
      {props.blog.reverse().map((blog, index) => {
        return <IndividualBlog key={index} index={index} blog={blog} student_id={thestudent} addVocabulary={props.addVocabulary}/>
      })}

    </div>
  )
}

export default function ViewBlogs(props) {
  const { loading, error, data } = useQuery(getAllBlogs);

  return (
    <div>{loading ? 'loading' : error ? 'error' : data ? (
      <ShowPosts blog={data.getCompleteBlogs} student_id={props.student_id} addVocabulary={props.addVocabulary} />
    ) : ('')}</div>
  )
}