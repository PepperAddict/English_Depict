import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_STUDENT } from '../../mutation/mutation';
import '../../styles/addstudent.styl';


export default function AddStudent(props) {

  const questionArray = ['What is your favorite color?', 'What is your favorite number?', 'What is your favorite food?',
    'What is your favorite pet\'s name?', 'What is your favorite toy?', 'Who is your current teacher?',
    'What color is your chair?', 'How many pets do you have?', 'What is your favorite animal?', 'What is your hair color?', 'What is your favorite game?', 'What is your favorite store?', 'What color are your eyes?',
    'What is your favorite computer', 'What is your favorite insect?'];

  const [question, setQuestion] = useState(questionArray[Math.floor(Math.random() * questionArray.length)]);
  const [username, setUsername] = useState('username');
  const [name, setName] = useState('name');
  const [identifier, setIdentifier] = useState('unique identifier')
  const [answer, setAnswer] = useState('answer')
  const [addRegistration] = useMutation(ADD_STUDENT);

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      teacher_id: props.userId,
      username: username.toLowerCase(), 
      name,
      question,
      identifier,
      password: answer.toLowerCase()
    };
    console.log(newStudent)
    addRegistration({variables: {input:newStudent}}).then( () => {
      location.reload();
    }).catch((e) => console.log(e));
  };

  return (
    <div className="add-student">
      <hr></hr>

      <h2>Add a student!</h2>
      <div>
        <form onSubmit={handleAddStudent}>

          <label htmlFor="studentUsername">Username</label><p className="tool username">?</p>
          <input id="studentUsername" onChange={e => setUsername(e.target.value)} name='username' required />

          <label htmlFor="studentName">Name</label><p className="tool name">?</p>
          <input id="studentName" onChange={e => setName(e.target.value)} name='name' />

          <label htmlFor="identifier">Unique Student Identifier</label><p className="tool identifier">?</p>
          <input id="identifier" onChange={e => setIdentifier(e.target.value)} name="identifier" required></input>

          <label htmlFor="question1">Question</label><p className="tool question">?</p>
          <input id="question1" name='question1' onChange={e => setQuestion(e.target.value) } defaultValue={question}/>

          <label htmlFor="answer1">Answer</label>
          <input id="answer1" onChange={e => setAnswer(e.target.value)} name='answer1' />

          <button type="submit">Add Student</button>

        </form>
      </div>
    </div>
  );
}
