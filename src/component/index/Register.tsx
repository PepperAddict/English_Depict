import React, { useState, useEffect, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REGISTRATION } from '../../mutation/mutation';
import Login from './Login';
import '../../styles/login.styl';
import { encryptMe } from '../../helpers';

/*
Errors: 
1 = Email address is taken
2 = Email doesn't contain an @
3 = Password doesn't match
*/

interface CheckEmailProps {
  setRegistered: any,
  registered: boolean,
}

function CheckEmail(props: CheckEmailProps) {
  const [account, setValue] = useState({
    email: 'email',
    user: '',
    passwordOne: '',
    passwordTwo: '',
    loading: true,
    role: 'teacher'
  });
  const [terror, setError] = useState(null); // 1 = email is taken, 2 = password doesnt match
  const [addRegistration] = useMutation(ADD_REGISTRATION);
  const handleRegister = e => {
    e.preventDefault();
    const newAccount = {
      username: account.user,
      email: account.email,
      password: account.passwordOne,
      verify_token: encryptMe(account.email),
      role: account.role
    };
    const passwordMatch = (account.passwordOne === account.passwordTwo) ? true : false;

    let shouldGo = true;

    // handle if email doesn't have an @ symbol
    if (!account.email.includes('@')) {
      setError(2);
      shouldGo = false;
    } else {
      setError(null);
      shouldGo = true;
    }
    // handle password mismatch
    if (!passwordMatch) {
      setError(3);
      shouldGo = false;
    } else {
      setError(null);
      shouldGo = true;
    }

    // no errors mean we can carry on with the registration
    if (shouldGo) {
      addRegistration({ variables: { input: newAccount } }).then(((e) => {
        setError(null);
        //send the correct info to /send route backend for email verification
        fetch('http://localhost:8080/send', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'email': newAccount.email,
            'token': newAccount.verify_token,
          }
        })

      })).then(() => {
        props.setRegistered(true)
      }).catch((err) => {
        console.log(err);
        setError(1);
      });
    }
  };

  const updateFields = e => {
    setValue({
      ...account, [e.target.name]: e.target.value || ''
    });
  };
  const changeLabel = (e) => {
    const sibling = e.previousSibling
    sibling.classList.add('label-active')
  }
  const close = e => {
    setError(null)
  }

  return (

    <div className="login-container">
      <div className="login-content">
        <a href="/" className="logo-container-link"><img className="logo-center" src="/images/logo-192.png" alt="logo" /></a>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>

          <label htmlFor="login-username">
            <p className="real-label">Name</p>
            <input id="login-username"
              defaultValue={account.user}
              onChange={updateFields} name='user'
              onFocus={e => changeLabel(e.target)} />
          </label>

          <label htmlFor="login-email">
            <p className="real-label">Email Address</p>
            <input id="login-email" name='email'
              onChange={updateFields}
              onFocus={e => changeLabel(e.target)}
              required />
          </label>

          <label htmlFor="login-passwordOne">
            <p className="real-label">Password</p>
            <input id="login-passwordOne"
              defaultValue={account.passwordOne}
              onChange={updateFields}
              name='passwordOne'
              type="password"
              minLength="6"
              maxLength="15"
              onFocus={e => changeLabel(e.target)}
              required />
          </label>

          <label htmlFor="login-passwordTwo">
            <p className="real-label">Verify Password</p>
            <input id="login-passwordTwo"
              defaultValue={account.passwordTwo}
              onChange={updateFields}
              name='passwordTwo'
              type="password"
              onFocus={e => changeLabel(e.target)}
              required />
          </label>

          <p>Are you a teacher or a parent/guardian?</p>
          <label className="radio-button">
            <input type="radio" name="role" value="teacher" onChange={updateFields} />Teacher
          </label>
          <label className="radio-button">
            <input type="radio" name="role" value="parent" onChange={updateFields} />Parent/Guardian
          </label>

          <div className="below-registration">
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </div>



          <button className="login-button" type='submit'>Register</button>

        </form>
        {terror && (
          <div className="error-area"><span onClick={close} className="close">×</span>
            {terror === 1 ? <p className="error">Email is taken</p> :
              terror === 2 ? <p className="error">Please enter a valid email address</p> :
                terror === 3 && <p className="error">Your passwords do not match. Please try again</p>}
          </div>
        )}

      </div>
      <div className="bottom"></div>
    </div>
  );
}

export default function Regi() {

  const [registered, setRegistered] = useState(false);


  return (
    <Fragment>
      {registered ?
        <Fragment>
          <p className="regSticky">Thank you for registering!
          Please verify your email address and sign in with your new account</p>
          <Login />
        </Fragment> :
        <Fragment>
          <CheckEmail
            registered={registered}
            setRegistered={setRegistered}
          />
        </Fragment>}
    </Fragment>
  );
}
