import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { ADD_STUDENT } from '../../mutation/mutation'




export default function AddStudent(props) {
  const userId = cookieParser('userID', true);
  const questionArray = ["What is your favorite color?", "What is your favorite number?", "What is your favorite food?",
    "What is your favorite pet's name?", "What is your favorite toy?", "Who is your current teacher's name",
    "What color is your chair?", "How many pets do you have?", "What is your favorite animal?", "What is your hair color?",
    "What is your favorite house?", "What is your favorite game?", "What is your favorite store?", "What color are your eyes?",
    "What is your favorite computer", "What is your favorite insect?"];

  const [student, setStudent] = useState({
    
    question1: questionArray[Math.floor(Math.random() * questionArray.length)],
    question2: questionArray[Math.floor(Math.random() * questionArray.length)],
    question3: questionArray[Math.floor(Math.random() * questionArray.length)]
  })

  const [addRegistration, { newData }] = useMutation(ADD_STUDENT);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const questions = `${student.question1};${student.question2};${student.question3}`;
    const answers = `${student.answer1};${student.answer2};${student.answer3}`

    const newStudent = {
      teacher_id: userId,
      username: student.username, 
      name: student.name,
      question: questions,
      password: answers
    }
    console.log(newStudent)
    addRegistration({variables: {input:newStudent}}).then((e) => {
      location.reload()
    }).catch((e) => console.log(e))
  }

  const updateFields = (e) => {
    setStudent({
      ...student, [e.target.name]: e.target.value || ''
    })
  }
  return (
    <div className="add-student">
      Let's add a student!
        <div>
        <form onSubmit={handleAddStudent}>

          <label htmlFor="studentUsername">Username</label>
          <input id="studentUsername" defaultValue={student.username} onChange={updateFields} name='username' placeholder={(student.username) ? student.username : 'username'} required />

          <label htmlFor="studentName">Name</label>
          <input id="studentName" defaultValue={student.name} onChange={updateFields} name='name' placeholder={(student.name) ? student.name : 'name'} />

          <p>Questions to ask your student</p>

          <label htmlFor="question1">Question 1</label>
          <input id="question1" name='question1' defaultValue={student.question1} onChange={updateFields} placeholder={student.question1} />

          <label htmlFor="answer1">Answer</label>
          <input id="answer1" defaultValue={student.answer1} onChange={updateFields} name='answer1' placeholder={(student.answer1) ? student.answer1 : 'answer'} />

          <label htmlFor="question2">Question 2</label>
          <input id="question2" name='question2' defaultValue={student.question2} onChange={updateFields} placeholder={student.question2} />

          <label htmlFor="answer2">Answer</label>
          <input id="answer2" defaultValue={student.answer2} onChange={updateFields} name='answer2' placeholder={(student.answer2) ? student.answer1 : 'answer'} />

          <label htmlFor="question3">Question 3</label>
          <input id="question3" name='question3' defaultValue={student.question3} onChange={updateFields} placeholder={student.question3} />

          <label htmlFor="answer3">Answer</label>
          <input id="answer3" defaultValue={student.answer3} onChange={updateFields} name='answer3' placeholder={(student.answer3) ? student.answer3 : 'answer'} />

          <button type="submit">Add Student</button>

        </form>
      </div>
    </div>
  )
}
