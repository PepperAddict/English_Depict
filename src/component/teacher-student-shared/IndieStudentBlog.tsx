import React, { useState } from 'react';
import Comments from '../Teacher/TeacherBlogComments';
import AddComment from './AddComment';
import BlogContent from './BlogContent';
import PropTypes from 'prop-types';

interface IndividualStudentBlogProps {
  teacher_id: number,
  index: number
}


export default function IndividualStudentBlog(props: IndividualStudentBlogProps) {
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
  );
}