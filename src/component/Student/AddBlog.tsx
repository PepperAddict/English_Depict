import React, { useState } from 'react';
import { ADD_BLOG } from '../../mutation/mutation';
import { useMutation } from '@apollo/react-hooks';
import '../../styles/lesson.styl';

interface AddBlogProps {
  student_id: number, 
  name: string,
  username: string
}

export default function AddBlog(props: AddBlogProps) {
  const [blog, setBlog] = useState({
    student_id: props.student_id
  });
  const [addBlog] = useMutation(ADD_BLOG);

  const submitBlog = (e) => {

    e.preventDefault();

    // set up a new string where a new line is wrapped in a <p> element and remove all
    // html elements!
    let newtext = blog.content.replace(/<\/?[^>]+(>|$)/g, '');

    const blogObject = {
      student_id: blog.student_id,
      subject: blog.subject,
      content: newtext
    };
    addBlog({ variables: { input: blogObject } }).then(() => {
      window.location.replace('/student/blogs');
    }).catch((e) => {
      console.log(e);
    });

  };

  const updateFields = (e) => { setBlog({ ...blog, [e.target.name]: e.target.value || '' }); };

  return (
    <div className="blog-container">
      <h2> What would you like to write about, {props.name}?</h2>
      <form onSubmit={submitBlog}>
        <button className="blog-button" type="submit">Publish Blog</button>
        <label htmlFor="subject"><p>Subject</p></label>
        <input id="subject" onChange={updateFields} name="subject" placeholder="subject" />
        <label htmlFor="content"><p>Content</p></label>
        <textarea id="content" onChange={updateFields} name="content" placeholder="" />
      </form>
    </div>

  );
}