import React, { useState, useEffect, Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getBlogByID, getStudentInfoSimple, getUserByIDSimple } from '../../query/query';

import moment from 'moment';

function TeacherComment(props) {
  const {loading, error, data} = useQuery(getUserByIDSimple, {variables: {userId: props.teacher_id}})

  return (
    <Fragment>
      {data && <p>Written by {data.getUser.username} on {moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}</p>}
    </Fragment>
  )
}

function StudentComment({student_id, date}) {
  const {loading, error, data } = useQuery(getStudentInfoSimple, {variables: {student_id}})

  return (
    <Fragment>
      {data && <p>Written by {data.getStudentByID[0].name} on {moment(date).format('MMMM Do YYYY, h:mm:ss a')}</p>}
    </Fragment>
  )
}
function IndividualComments(props) {
  const [comments, setComments] = useState(props.data)
  const [studentComment, setStudentComment] = useState(false)
  const [teacherComment, setTeacherComment] = useState(false)

  useState(() => {
    if (comments.student_id) {
      setStudentComment(comments.student_id)
    } else {
      setTeacherComment(comments.teacher_id)
    }
  }, [])

  return (<div className="black">
    {comments.content}
    {studentComment ? <StudentComment student_id={studentComment} date={comments.created_at}/> : teacherComment && <TeacherComment teacher_id={teacherComment} date={comments.created_at}/>}


  </div>)
}


export default function Comments(props) {
  const [comments, setComments] = useState(props.comments)

  

  return (
    <div className="black">
      {comments.map((comments, key) => {
      return <IndividualComments key={key} index={key} data={comments} />
      })}
    </div>
  )
}