import React, { useState, useEffect, Fragment } from 'react';
import Comments from './TeacherBlogComments.jsx';
import AddComment from './AddComment.jsx';
import BlogContent from './BlogContent.jsx';
import PropTypes from 'prop-types';

IndividualStudentBlog.propTypes = {
  teacher_id: PropTypes.number,
  index: PropTypes.number
}

export default function IndividualStudentBlog(props) {
  const [blog] = useState(props);
  const blog_id = parseInt(blog.blog_id);
  return (
    <article index={props.index}>
      <h2>{blog.subject}</h2>


      <BlogContent content={blog.content} addVocabulary={null} />
      {blog.comments.length > 0 &&
        <Comments comments={blog.comments} />}
      <AddComment blog_id={blog_id} teacher_id={props.teacher_id} />
    </article>
  )
}