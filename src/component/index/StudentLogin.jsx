import React, {useState, useEffect, Fragment} from 'react';
import {LoginStudent} from '../../query/query';
import {useQuery, useApolloClient} from '@apollo/react-hooks';
import '../../styles/student.styl';
import StageThree from './StudentLoginStageThree';


function StageOne(props) {
  const client = useApolloClient();
  const [studentInfo, setStudentInfo] = useState({
    username: '', 
    question: '',
    password: '',
    secondPassword: '',
  })
  const [error, setError] = useState(false)

  const usernameSubmit = e => {
    e.preventDefault();
    client.query({
      query: LoginStudent, 
      variables: {
        username: studentInfo.username
      }
    }).then((e) => {
      if (e.data.loginStudent.length > 0) {
        props.updateParent({
          id: e.data.loginStudent[0].student_id,
          username: e.data.loginStudent[0].username,
          name: e.data.loginStudent[0].name || e.data.loginStudent[0].username,
          question: e.data.loginStudent[0].question, 
          password: e.data.loginStudent[0].password,
          verified: e.data.loginStudent[0].verified,
          second_password: (e.data.loginStudent[0].verified) ? e.data.loginStudent[0].second_password : false,
          student_key: e.data.loginStudent[0].student_key,
          stage1: false,
          stage2: true})
      } else {
        setError(1)
      }
    }).catch((e) => {
      console.log(e)
    })

  }
  
  return (
<div className="check-username">
  <div className="three-dot"><span className="active">•</span> • •</div>
      <h1>Hello Student!</h1>
     <form onSubmit={usernameSubmit}>
       <label htmlFor="username">Please enter your username below ↴</label>
       <input id="username" onChange={e => {setStudentInfo({username: e.target.value}); setError(false)}} />
       <button type="submit">Submit Username</button>
     </form>
     {error && error === 1 && <p className="error" onClick={e => {setError(false)}}>Sorry, we could not find <strong>{studentInfo.username}</strong> in our system. Please ask
       your teacher to add you in.
     </p>}
</div>
  )
}

function StageTwo(props) {
  const [questionIt, setQuestion] = useState(props);
  const [error, setError] = useState(false)
  const checkAnswer = e => {
    e.preventDefault();
    if (questionIt.password === questionIt.answerCheck) {
      props.updateParent({...questionIt, stage1: false, stage2: false, stage3: true})
    } else {
      setError(1)
    }
  }
  const check = e => {
    setError(false)
    setQuestion({
      ...questionIt, [e.target.name]: e.target.value || ''
    })
  }
return (
  <div className="welcome-question">
      <div className="three-dot">• <span className="active">•</span> •</div>
    <h1>Welcome <strong>{questionIt.name? questionIt.name : questionIt.username}</strong>!</h1>
    <h2>This is your first time here. Please answer the question below to get started.</h2> 
    <form onSubmit={checkAnswer}>
      <label htmlFor="question" name="question"><h2>{questionIt.question}</h2></label>
      <input id="question" name="answerCheck" onChange={check}></input>
      <button type="submit">Submit Answer</button>
    </form>
    {error && error === 1 && <p className="error">Wrong answer. Please try again or get in touch with your teacher.</p>}
  </div>
)
}


//main intro
export default function StudentLogin() {
  const [studentLogin, setStudentLogin] = useState({
    id: '',
    username: '',
    question: '',
    name: '',
    password: '',
    secondPassword: '',
    student_key: '',
    verified: false, 
    stage1: true, 
    stage2: false,
    stage3: false,
  })


  const updateParent = (update) => {
    setStudentLogin(update)
  }
  
  /*
  Stage 1 enter the username and send it to stage 2 if not verified or 3 if verified
  stage 2 ask the question before setting up password
  stage 3 set up a password or login with password depending if verified.
  */

  return (
   <div className="student-login-container">
     <div className="student-login-inner">
     {studentLogin.stage1 ? <StageOne updateParent={updateParent}/> : 

     studentLogin.stage2 && !studentLogin.verified ? <StageTwo 
      id={studentLogin.id}
      student_key={studentLogin.student_key}
      username={studentLogin.username} 
      name={studentLogin.name} 
      question={studentLogin.question}
      password={studentLogin.password}
      updateParent={updateParent}/> : 

     studentLogin.stage3 && !studentLogin.verified ? <StageThree 
     username={studentLogin.username}
     name={studentLogin.name}
     verified={studentLogin.verified} 
     id={studentLogin.id}/> : 
     studentLogin.verified && <StageThree 
     username={studentLogin.username}
     name={studentLogin.name}
     verified={studentLogin.verified} 
     id={studentLogin.id} 
     second_password={studentLogin.second_password} 
     student_key={studentLogin.student_key} /> }
    </div>

    <span className="teacher-corner"><a href="/login">Teacher Login</a>.</span>
   </div>
  )
}