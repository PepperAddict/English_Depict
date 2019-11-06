import React, {useState, useEffect} from 'react';
import {ADD_BLOG} from '../../mutation/mutation';
import {useMutation} from '@apollo/react-hooks';


export default function AddBlog({student_id}) {
  const [blog, setBlog] = useState({student_id});
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
    <form onSubmit={submitBlog}>
      <label htmlFor="subject">Subject</label>
      <input id="subject" onChange={updateFields} name="subject" placeholder="subject" /> 

      <label htmlFor="content">Content</label>
      <textarea id="content" onChange={updateFields} name="content" placeholder="" />

      <button type="submit">Submit your blog</button>
    </form>
  )
  }