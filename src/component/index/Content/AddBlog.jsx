import React, {useState, useEffect, Fragment} from 'react';
import {ADD_BLOG} from '../../../mutation/mutation';
import {useMutation} from '@apollo/react-hooks';
import '../../../styles/lesson.styl'


export default function AddBlog(props) {
  const [blog, setBlog] = useState({
    student_id: props.student_id
  });
  const [addBlog, {blogData}] = useMutation(ADD_BLOG)

  const submitBlog = (e) => {

    e.preventDefault();
    addBlog({variables: {input: blog}}).then((e) => {
      window.location.replace('/student/blogs')
    })
    .catch((e) => {
      console.log(e)
    })

  }

  const updateFields = (e) => {
    setBlog({
      ...blog, [e.target.name]: e.target.value || ''
    })
  }

  return (
    <div className="blog-container">
      <h2>Hello {props.name}</h2>
      <h3> What would you like to write about today?</h3>
      <form onSubmit={submitBlog}>
      <button className="blog-button" type="submit">Publish Blog</button>
      <label htmlFor="subject"><p>Subject</p></label>
      <input id="subject" onChange={updateFields} name="subject" placeholder="subject" /> 

      <label htmlFor="content"><p>Content</p></label>
      <textarea id="content" onChange={updateFields} name="content" placeholder="" />

      
      </form>
    </div>

  )
  }