/*
This is for View Blog in Student's Dashboard.
*/

import React, { useState, useEffect, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getAllBlogs } from '../../query/query';
import { getStudentInfo } from '../../query/query';
import moment from 'moment';
import PropType from 'prop-types';
import BlogContent from './BlogContent';
import { Link } from 'react-router-dom';
import { StudentContext } from '../index/Context';

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
    <StudentContext.Consumer>
      {context => (
        <Fragment>
          <div className={data ? author === student ? 'blog students-blog' : 'blog' : 'blog'}>
            <div className="date">{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</div>
            <h2>{props.blog.subject}</h2>
            <BlogContent content={props.blog.content} addVocabulary={props.addVocabulary} />
            <div className="author">Written by {data &&
              <span className="avatar">
                <img className="avatar-image" src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : 'none'} alt={data.getStudentByID[0].name + ' avatar'} />
              </span>} {data ? data.getStudentByID[0].name == null ? data.getStudentByID[0].username : data.getStudentByID[0].name : 'Unknown'}</div>
            {props.editMe && <div className="edit">
              <Link to="/student/edit-blog" onClick={e => context.setBlog(props.blog)}>Edit Blog</Link>
            </div>}
            <a href={'/student/view-comments=' + props.blog.blog_id}>{props.comment.length === 0 ? '0 Comments' : props.comment.length === 1 ? '1 Comment' : props.comment.length > 0 && props.comment.length + ' Comments'}</a>
          </div>
        </Fragment>

      )}
    </StudentContext.Consumer>

  );
}

interface ShowPostsProps {
  student_id: number,
  addVocabulary: any,
  blog: any,
  date: string
}

function ShowPosts(props: ShowPostsProps) {
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
interface ViewBlogsProp {
  student_id: number,
  blogs: any,
  addVocabulary: any
}

export default function ViewBlogs(props: ViewBlogsProp) {
  // TODO Show all related students to the teacher so they can read each other's blogs
  // const [studentOnly, setStudentOnly] = useState(false);
  const [blog] = useState(props.blogs);

  return (
    <ShowPosts blog={blog} date={blog.created_at} student_id={props.student_id} addVocabulary={props.addVocabulary} />
  );
}