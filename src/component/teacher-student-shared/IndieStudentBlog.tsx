import React, { useState } from 'react';
import Comments from '../Teacher/TeacherBlogComments';
import AddComment from './AddComment';
import BlogContent from './BlogContent';

interface IndividualStudentBlogProps {
  teacher_id: number,
  index: number,
  key: number,
  blog_id: number,
  subject: string,
  content: string,
  comments: string
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