import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { ADD_STUDENT } from '../../mutation/mutation';
import '../../styles/addstudent.styl';

interface AddStudentProps {
  userId: number,
  students: any
}

export default function AddStudent(props: AddStudentProps) {


  const questionArray = ['What is your favorite color?', 'What is your favorite number?', 'What is your favorite food?',
    'What is your favorite pet\'s name?', 'What is your favorite toy?', 'Who is your current teacher?',
    'What color is your chair?', 'How many pets do you have?', 'What is your favorite animal?', 'What is your hair color?', 'What is your favorite game?', 'What is your favorite store?', 'What color are your eyes?',
    'What is your favorite computer', 'What is your favorite insect?'];

  let identifierList = [
    "peacock", "lion", "dog", "toucan", "squid", "piranha", "cat", "otter", "salmon", "falcon", "eagle", "slug", "bird",
    "cheetah", "tiger", "elephant", "giraffe", "snake", "tarantula", "bumblebee", "mantis", "grasshopper", 
    "raccoon", "butterfly", "beetle", "octopus", "hawk", "owl", "moth", "dragonfly", "worm",
    "katydid", "wasp", "caterpillar", "cicada",  "monkey", "ladybug", "lizard", "rabbit", "bunny", "kitten",
    "puppy", "cricket", "fox", "weasel", "bear", "deer", "hyena", "sheep", "wolf", "lamb", "coyote", "leopard", "ram", 
    "pig", "duck", "parrot", "penguin", "sealion", "dolphin", "whale", "shark", "beluga", "koala", "panda", "lemur",
    "mongoose", "hamster", "mouse"
  ].sort()

  const [question, setQuestion] = useState(questionArray[Math.floor(Math.random() * questionArray.length)]);
  const [username, setUsername] = useState('username');
  const [name, setName] = useState('name');
  const [error, setError] = useState(false)
  
  const [answer, setAnswer] = useState('answer')
  const [addRegistration] = useMutation(ADD_STUDENT);
  let arrayOfTakens = [];
  

  if (props.students) {
    for (let stud of props.students) {
      arrayOfTakens.push(stud.identifier)
    }
  }

  const [identifier, setIdentifier] = useState(identifierList[0])
  //take out the taken from list
  identifierList = identifierList.filter( (list) => !arrayOfTakens.includes(list))


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
    }).catch((e) => 
    setError(true));
  };

  return (
    <div className="add-student">
      <hr></hr>

      <h2>Add a student!</h2>
      {error && <p>Sorry, the username is already taken. Please try again.</p>}
      <div>
        <form onSubmit={handleAddStudent}>

          <label htmlFor="studentUsername">Username</label><p className="tool username">?</p>
          <input id="studentUsername" pattern="[A-Za-z]{3, 15}" onChange={e => setUsername(e.target.value)} name='username' required />

          <label htmlFor="studentName">Name</label><p className="tool name">?</p>
          <input id="studentName" pattern="[A-Za-z]{3, 15}" onChange={e => setName(e.target.value)} name='name' />

          <label htmlFor="identifier">Animal Identifier</label><p className="tool identifier">?</p>
          
          <select className="full-width" name="identifier" id="identifier" onChange={e => setIdentifier(e.target.value)}>
          {identifierList.map((item, key) => 
          <option value={item} key={item}>{item}</option>)}
          </select>
          {/* <input id="identifier" onChange={e => setIdentifier(e.target.value)} name="identifier" required></input> */}

          <label htmlFor="question1">Question</label><p className="tool question">?</p>
          <input id="question1" name='question1' onChange={e => setQuestion(e.target.value) } defaultValue={question}/>

          <label htmlFor="answer1">Answer</label>
          <input id="answer1" pattern="[A-Za-z]{3, 15}" maxLength="15" onChange={e => setAnswer(e.target.value)} name='answer1' />

          <button type="submit">Add Student</button>

        </form>
      </div>
    </div>
  );
}
