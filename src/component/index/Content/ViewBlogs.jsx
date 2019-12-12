/*
This is for View Blog in Student's Dashboard.
*/

import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAllBlogs } from '../../../query/query';
import { getStudentInfo } from '../../../query/query';
import moment from 'moment';
import PropType from 'prop-types';
import BlogContent from './BlogContent.jsx';

IndividualBlog.propTypes = {
  student_id: PropType.number,
  blog: PropType.object,
  addVocabulary: PropType.func,
  comment: PropType.array,
  editMe: PropType.bool
};
function IndividualBlog(props) {
  let author = props.student_id;
  let student = props.student_id;
  const time = props.blog.created_at;

  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: parseInt(author) } });

  return (
    <div className={data ? author === student ? 'blog students-blog' : 'blog' : 'blog'}>
      <div className="date">{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</div>
      <h2>{props.blog.subject}</h2>
      <BlogContent content={props.blog.content} addVocabulary={props.addVocabulary} />
      <div className="author">Written by {data &&
        <span className="avatar">
          <img className="avatar-image" src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : 'none'} alt={data.getStudentByID[0].name + ' avatar'} />
        </span>} {data ? data.getStudentByID[0].name == null ? data.getStudentByID[0].username : data.getStudentByID[0].name : 'Unknown'}</div>
      {props.editMe && <div className="edit"><a href={'/student/edit-blog=' + props.blog.blog_id}>Edit Blog</a></div>}
      <a href={'/student/view-comments=' + props.blog.blog_id}>{props.comment.length === 0 ? '0 Comments' : props.comment.length === 1 ? '1 Comment' : props.comment.length > 0 && props.comment.length + ' Comments'}</a>
    </div>
  );
}

ShowPosts.propTypes = {
  student_id: PropType.number,
  addVocabulary: PropType.func,
  blog: PropType.array
};

function ShowPosts(props) {
  //All blog posts 
  const thestudent = props.student_id;

  return (
    <div className="student_blogs">
      {props.blog.map((blog, index) => {
        return <IndividualBlog
          editMe={true}
          comment={blog.comments}
          key={index}
          index={index}
          blog={blog}
          student_id={thestudent}
          addVocabulary={props.addVocabulary} />;
      })}

    </div>
  );
}

ViewBlogs.propTypes = {
  student_id: PropType.number,
  blogs: PropType.array,
  addVocabulary: PropType.func
};

export default function ViewBlogs(props) {
  // TODO Show all related students to the teacher so they can read each other's blogs
  // const [studentOnly, setStudentOnly] = useState(false);
  const [blog] = useState(props.blogs);


  return (
    <ShowPosts blog={blog} date={blog.created_at} student_id={props.student_id} addVocabulary={props.addVocabulary} />
  );
}