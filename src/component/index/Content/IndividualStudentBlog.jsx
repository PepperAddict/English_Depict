import React, { useState, useEffect, Fragment } from 'react';
import Comments from './TeacherBlogComments.jsx';
import AddComment from './AddComment.jsx';

export default function IndividualStudentBlog(props) {
  const [blog] = useState(props);
  const blog_id = parseInt(blog.blog_id);
  return (
    <article index={props.index}><b>{blog.subject}</b><p>{blog.content}</p>
      {blog.comments.length > 0 &&
        <Comments comments={blog.comments} />}
      <AddComment blog_id={blog_id} teacher_id={props.teacher_id} />
    </article>
  )
}