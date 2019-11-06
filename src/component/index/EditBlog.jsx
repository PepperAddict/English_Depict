import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getBlogByID } from '../../query/query';
import {EDIT_BLOG} from '../../mutation/mutation'
import ViewBlogs from './ViewBlogs.jsx'

export default function EditBlog(props) {

  const [blog_id, setBlog_id] = useState(window.location.pathname.split('=')[1])
  const [owner, setOwner] = useState(false);
  const [blog, setBlog] = useState({})
  const [editBlog, {blogged}] = useMutation(EDIT_BLOG);

  const { loading, error, data } = useQuery(getBlogByID, { variables: { blog_id: blog_id } })
  useEffect(() => {
    if (data) {
      if (data.getBlogByID[0].student_id === props.student_id) {
        console.log('owner')
        setOwner(true)
      }

    }
  }, [data])

  const submitChanges = async e => {
    e.preventDefault();
    console.log(blog.subject)
    let defaultSubject;
    let defaultContent
    if (blog.subject === undefined) {
      console.log('undefined')
      defaultSubject = data.getBlogByID[0].subject
    }
    if (blog.content === undefined) {
      defaultContent = data.getBlogByID[0].content
    }
    let full = await {
      blog_id: blog_id,
      subject: blog.subject ? blog.subject : defaultSubject, 
      content: blog.content ? blog.content : defaultContent,
      updated_at: new Date()
    }

    editBlog({variables: {input: full}}).then((e) => {
      window.location.href= '/student/blogs'
    }).catch((err) => {
      console.log(err)
    })
  }

  const updateFields = e => {
    setBlog({
      ...blog, [e.target.name]: e.target.value || ''
    })
  }


  return (
    <Fragment>
      {loading ? 'loading' : error ? 'error' : data && owner ? (
            <form onSubmit={submitChanges}>
            <label htmlFor="subject">Subject</label>
            <input id="subject" defaultValue={data.getBlogByID[0].subject} onChange={updateFields} name="subject" placeholder="subject" /> 
      
            <label htmlFor="content">Content</label>
            <textarea id="content" defaultValue={data.getBlogByID[0].content} onChange={updateFields} name="content" placeholder="" />
      
            <button type="submit">Submit Changes</button>
          </form>
      ) : <ViewBlogs student_id={props.student_id} />}
    </Fragment>
  )
}