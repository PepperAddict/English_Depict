import React, {useState, useEffect, Fragment} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {getStudentInfo} from '../../../query/query';
import Comments from './TeacherBlogComments.jsx';
import { ADD_COMMENT} from '../../../mutation/mutation';

function AddComment(props) {
  const [addComment, {commentData}] = useMutation(ADD_COMMENT)
  const [content, setContent] = useState('');
  const submit = e => {
    e.preventDefault();
    const commentInfo = {
      blog_id: parseInt(props.blog_id), 
      student_id: null,
      teacher_id: parseInt(props.teacher_id), 
      content: content
    }
    console.log(commentInfo)
    addComment({variables: {input: commentInfo}}).then((res) => {
      console.log(res)
    }).then((err) => {
      console.log(err)
    })
  }
  return (<form onSubmit={submit}>
    <label htmlFor="add-comment">Add Comment</label>
    <textarea id="add-comment" onChange={e => setContent(e.target.value)}/>
    <button type="submit">submit comment</button>
  </form>)
}

function StudentProfile(props) {

 return (
   <div>

     <div className="avatar">
       <img className="avatar-image" src={props.data.avatar} />
     </div>
    <h2>Vocabulary Words</h2>
     <ul className="vocabulary-list">
       {props.data.vocabularies.length > 0 ?  props.data.vocabularies.map((words, key) => {
         return <li key={words.vocab_id} index={key}>{words.vocabulary_word}</li>
       }) : 'No Vocabulary' }
     </ul>

     <h2>Blogs</h2>
     {props.data.blogs.length > 0 ? props.data.blogs.map((blog, key) => {
     return <div key={blog.blog_id} index={key}><b>{blog.subject}</b><p>{blog.content}</p>
     {blog.comments.length > 0 && <Comments comments={blog.comments}/>}
     <AddComment blog_id={blog.blog_id} teacher_id={props.teacher_id}/>
     </div>
     }) : 'No Blog'}
   </div>
 )
}

export default function IndividualStudent(props) {
  const pathname = window.location.pathname.split('=');
  const student_id = pathname[pathname.length -1];
  
  const [students, setStudents] = useState(props.data.students);
  const [myStudent, setMyStudent] = useState(false);
  const {loading, error, data} = useQuery(getStudentInfo, {variables: {student_id}})

  useEffect(() => {
      //only show student information if student id is in teacher's student list 
    for (let x of students) {
      if (x.student_id === student_id) {
        setMyStudent(true)
        break;
      }
    }
  }, [])

  return (
    <Fragment>
      {myStudent && data ? <StudentProfile data={data.getStudentByID[0]} teacher_id={props.teacher_id} /> : null}
    </Fragment>
  )
}