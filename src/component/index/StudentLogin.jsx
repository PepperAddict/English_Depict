import React, {useState} from 'react';
import {LoginStudent} from '../../query/query';
import {useQuery, useApolloClient} from '@apollo/react-hooks';
import '../../styles/student.styl';
import StageThree from './StudentLoginStageThree';


function StageOne({updateParent}) {
  const client = useApolloClient();
  const [studentInfo, setStudentInfo] = useState({
    username: '', 
    question: '',
    password: '',
    secondPassword: '',
  })

  const usernameSubmit = e => {
    e.preventDefault();
    client.query({
      query: LoginStudent, 
      variables: {
        username: studentInfo.username
      }
    }).then((e) => {
      if (e.data.loginStudent.length > 0) {
        console.log(e.data.loginStudent)
        updateParent({
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
      }

    }).catch((e) => {
      console.log(e)
    })

  }
  
  return (
<div>
     <form onSubmit={usernameSubmit}>
       <label htmlFor="username">What is your username?</label>
       <input id="username" onChange={e => {setStudentInfo({username: e.target.value})}} />
       <button type="submit">Submit Username</button>
     </form>
</div>
  )
}

function StageTwo(props) {
  const [questionIt, setQuestion] = useState(props);
  const checkAnswer = e => {
    e.preventDefault();
    if (questionIt.password === questionIt.answerCheck) {
      props.updateParent({...questionIt, stage1: false, stage2: false, stage3: true})
    }
  }
  const check = e => {
    setQuestion({
      ...questionIt, [e.target.name]: e.target.value || ''
    })
  }
return (
  <div>
    Hello {questionIt.name}
    <form onSubmit={checkAnswer}>
      <label htmlFor="question" name="question">{questionIt.question}</label>
      <input id="question" name="answerCheck" onChange={check}></input>
      <button type="submit">Submit Answer</button>
    </form>

  </div>
)
}



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
    stage4: false, 
  })

  const updateParent = (update) => {
    setStudentLogin(update)
    console.log(update)
  }
  
  return (
   <div className="student-login-container">
     <div className="student-login-inner">
       Hi Student! Let's sign in! 
     
     {studentLogin.stage1 ? <StageOne updateParent={updateParent}/> : 
     studentLogin.stage2 && !studentLogin.verified ? (<StageTwo 
      id={studentLogin.id}
      student_key={studentLogin.student_key}
      username={studentLogin.username} 
      name={studentLogin.name} 
      question={studentLogin.question}
      password={studentLogin.password}
      updateParent={updateParent}/>) : 
     studentLogin.stage3 && !studentLogin.verified ? (<StageThree verified={studentLogin.verified} id={studentLogin.id}/>) : 
     studentLogin.verified ? (<StageThree verified={studentLogin.verified} id={studentLogin.id} second_password={studentLogin.second_password} student_key={studentLogin.student_key} />) : ('')}
    </div>
   </div>
  )
}