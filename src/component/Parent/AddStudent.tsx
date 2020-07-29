import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useLocation, useHistory } from 'react-router-dom';

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
    "katydid", "wasp", "caterpillar", "cicada", "monkey", "ladybug", "lizard", "rabbit", "bunny", "kitten",
    "puppy", "cricket", "fox", "weasel", "bear", "deer", "hyena", "sheep", "wolf", "lamb", "coyote", "leopard", "ram",
    "pig", "duck", "parrot", "penguin", "sealion", "dolphin", "whale", "shark", "beluga", "koala", "panda", "lemur",
    "mongoose", "hamster", "mouse"
  ].sort()

  const [question, setQuestion] = useState(questionArray[Math.floor(Math.random() * questionArray.length)]);
  const [username, setUsername] = useState('username');
  const [name, setName] = useState('name');
  const [error, setError] = useState(false);
  const history = useHistory();

  const [answer, setAnswer] = useState('answer');
  const [addRegistration] = useMutation(ADD_STUDENT);
  let arrayOfTakens = [];


  if (props.students) {
    for (let stud of props.students) {
      arrayOfTakens.push(stud.identifier)
    }
  }


  //take out the taken from list
  identifierList = identifierList.filter((list) => !arrayOfTakens.includes(list))
  const [identifier, setIdentifier] = useState(identifierList[0])

  const handleAddStudent = (e) => {
    e.preventDefault();

    const newStudent = {
      parent_id: props.userId,
      username: username.toLowerCase(),
      name,
      question,
      identifier,
      password: answer.toLowerCase()
    };

    addRegistration({ variables: { input: newStudent } }).then(() => {
      history.push('/parent-dashboard')
    }).catch((e) =>
      setError(true));
  };

  return (
    <div className="add-student">

      <h2>Add A Student</h2>
      {error && <p>Sorry, the username is already taken. Please try again.</p>}
      <div>
        <form onSubmit={handleAddStudent}>

          <label htmlFor="studentUsername">
            <h3 className="actual-label">Username</h3>
            <input id="studentUsername" pattern="[A-Za-z0-9]+" onChange={e => setUsername(e.target.value)} name='username' required />
            <span className="tip">Username must be unique and can contain letters and numbers.</span>
          </label>
          <label htmlFor="studentName">
            <h3 className="actual-label">Name</h3>
            <input id="studentName" pattern="^[A-Za-z]+([A-Za-z ][A-Za-z]+)*$" onChange={e => setName(e.target.value)} name='name' />
            <span className="tip"></span>
          </label>
          <label htmlFor="identifier">
            <h3 className="actual-label">Animal Identifier</h3>

            <select className="full-width" name="identifier" id="identifier" onChange={e => setIdentifier(e.target.value)}>
              {identifierList.map((item, key) =>
                <option value={item} key={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>)}
            </select>
            {/* <input id="identifier" onChange={e => setIdentifier(e.target.value)} name="identifier" required></input> */}
            <span className="tip">Choose an animal to identify the student.</span>
          </label>
          <label htmlFor="question1">
            <h3 className="actual-label">Question</h3>
            <input id="question1" name='question1' onChange={e => setQuestion(e.target.value)} defaultValue={question} />
            <span className="tip">This is used to setup a student's web account.</span>
          </label>
          <label htmlFor="answer1">
            <h3 className="actual-label">Answer</h3>
            <input id="answer1" pattern="^[A-Za-z]+([A-Za-z ][A-Za-z]+)*$" maxLength="25" onChange={e => setAnswer(e.target.value)} name='answer1' />
          </label>
          <button className="blue-button" type="submit">Submit Student</button>

        </form>
      </div>
    </div>
  );
}
