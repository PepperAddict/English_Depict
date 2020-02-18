import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { ADD_STUDENT } from '../../mutation/mutation';
import '../../styles/addstudent.styl';


export default function AddStudent() {
  const userId = cookieParser('userID', true);
  const questionArray = ['What is your favorite color?', 'What is your favorite number?', 'What is your favorite food?',
    'What is your favorite pet\'s name?', 'What is your favorite toy?', 'Who is your current teacher?',
    'What color is your chair?', 'How many pets do you have?', 'What is your favorite animal?', 'What is your hair color?', 'What is your favorite game?', 'What is your favorite store?', 'What color are your eyes?',
    'What is your favorite computer', 'What is your favorite insect?'];

  const [student, setStudent] = useState({
    
    question1: questionArray[Math.floor(Math.random() * questionArray.length)],

  });

  const [addRegistration] = useMutation(ADD_STUDENT);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const questions = student.question1;
    const answers = student.answer1.toLowerCase();

    const newStudent = {
      teacher_id: userId,
      username: student.username.toLowerCase(), 
      name: student.name,
      question: questions,
      password: answers
    };
    addRegistration({variables: {input:newStudent}}).then( () => {
      location.reload();
    }).catch((e) => console.log(e));
  };

  const updateFields = (e) => {
    setStudent({
      ...student, [e.target.name]: e.target.value || ''
    });
  };
  return (
    <div className="add-student">
      <hr></hr>

      <h2>Add a student!</h2>
      <div>
        <form onSubmit={handleAddStudent}>

          <label htmlFor="studentUsername">Username</label><p className="tool username">?</p>
          <input id="studentUsername" defaultValue={student.username} onChange={updateFields} name='username' placeholder={(student.username) ? student.username : 'username'} required />

          <label htmlFor="studentName">Name</label><p className="tool name">?</p>
          <input id="studentName" defaultValue={student.name} onChange={updateFields} name='name' placeholder={(student.name) ? student.name : 'name'} />

          <label htmlFor="question1">Question</label><p className="tool question">?</p>
          <input id="question1" name='question1' defaultValue={student.question1} onChange={updateFields} placeholder={student.question1} />

          <label htmlFor="answer1">Answer</label>
          <input id="answer1" defaultValue={student.answer1} onChange={updateFields} name='answer1' placeholder={(student.answer1) ? student.answer1 : 'answer'} />

          <button type="submit">Add Student</button>

        </form>
      </div>
    </div>
  );
}
