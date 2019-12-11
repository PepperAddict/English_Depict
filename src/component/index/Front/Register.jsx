import React, { useState, useEffect, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REGISTRATION } from '../../../mutation/mutation';
import Login from './Login.jsx';
import '../../../styles/register.styl';
import PropTypes from 'prop-types';

/*
Errors: 
1 = Email address is taken
2 = Email doesn't contain an @
3 = Password doesn't match
*/

CheckEmail.propTypes = {
  setError: PropTypes.func,
  setRegistered: PropTypes.func

};

function CheckEmail(props) {
  const [account, setValue] = useState({
    email: 'example@example.com',
    user: '',
    passwordOne: '',
    passwordTwo: '',
    loading: true,
  });

  const [addRegistration] = useMutation(ADD_REGISTRATION);

  const handleRegister = e => {
    e.preventDefault();
    const newAccount = {
      username: account.user,
      email: account.email,
      password: account.passwordOne
    };
    const passwordMatch = (account.passwordOne === account.passwordTwo) ? true : false;

    let shouldGo = true;

    // handle if email doesn't have an @ symbol
    if (!account.email.includes('@')) {
      props.setError(2);
      shouldGo = false;
    } else {
      props.setError(null);
      shouldGo = true;
    }
    // handle password mismatch
    if (!passwordMatch) {
      props.setError(3);
      shouldGo = false;
    } else {
      props.setError(null);
      shouldGo = true;
    }

    // no errors mean we can carry on with the registration
    if (shouldGo) {
      addRegistration({ variables: { input: newAccount } }).then((() => {
        props.setRegistered(true);
        props.setError(null);
      })).catch((err) => {
        console.log(err);
        props.setError(1);
      });
    }
  };

  const updateFields = e => {
    setValue({
      ...account, [e.target.name]: e.target.value || ''
    });
  };

  return (

    <div className="register-form">
      <h1>Register for an account</h1>
      <form onSubmit={handleRegister}>

        <label htmlFor="login-username">Name</label>
        <input id="login-username" defaultValue={account.user} onChange={updateFields} name='user' placeholder={(account.user) ? account.user : 'username'} />

        <label htmlFor="login-email">E-mail Address</label>
        <input id="login-email" name='email' onChange={updateFields} placeholder={account.email} required/>

        <label htmlFor="login-passwordOne">Password</label>
        <input id="login-passwordOne" defaultValue={account.passwordOne} onChange={updateFields} name='passwordOne' type="password" placeholder={(account.passwordOne) ? account.passwordOne : 'password'} minLength="6" maxLength="15" required />

        <label htmlFor="login-passwordTwo">Verify Password</label>
        <input id="login-passwordTwo" defaultValue={account.passwordTwo} onChange={updateFields} name='passwordTwo' type="password" placeholder={(account.passwordTwo) ? account.passwordTwo : 'Verify your Password'} required/>
        
        <button className="login-button" type='submit'>Submit Registration</button>

      </form>
    </div>
  );
}

export default function Regi() {
  const [variable, setVariable] = useState({
    registered: false,
    forError: {
      status: false,
      text: ''
    }
  });
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);

  const fromChild = (update) => {
    const newUpdate = update;
    setVariable(newUpdate);
  };

  useEffect(() => {
    setVariable(variable);
  }, [variable]);

  return (
    <Fragment>
      {registered ? <Login /> : 
      <div className="register-container">
        
        <CheckEmail registered={registered} error={error} updateParent={fromChild} setRegistered={setRegistered} setError={setError} />
        {error === 1 ? <p className="error">Email is taken</p> :
          error === 2 ? <p className="error">Please enter a valid email address</p> :
            error === 3 && <p className="error">Your passwords do not match. Please try again</p>}
      </div>}
    </Fragment>
  );
}
