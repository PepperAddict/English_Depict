import React, { useState, useEffect, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_REGISTRATION } from '../../mutation/mutation';
import Login from './Login';
import '../../styles/login.styl';
import { encryptMe } from '../../helpers';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginRegister from './LoginRegisterLinks';
import LoginWith from './loginWith';
import Agree from './SharedAgree';
import { useLocation, useHistory } from 'react-router-dom';


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
  });
  const [terror, setError] = useState(null); // 1 = email is taken, 2 = password doesnt match
  const [addRegistration] = useMutation(ADD_REGISTRATION);
  const location = useLocation();
  const amazon = (window as any).amazon

  const handleRegister = async (awsData = null) => {
    event.preventDefault();
    let newAccount;
    let passwordMatch = false;
    let shouldGo = false;
    if (!awsData) {
      newAccount = {
        username: account.user,
        email: account.email,
        password: account.passwordOne,
        verify_token: await encryptMe(account.email),
      };
      passwordMatch = (account.passwordOne === account.passwordTwo) ? true : false;
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

    } else {
      newAccount = {
        username: awsData.name,
        email: awsData.email,
        password: awsData.pw,
        verify_token: await encryptMe(awsData.email),
        amazon: awsData.email
      }
      shouldGo = true
    }


    // no errors mean we can carry on with the registration
    if (shouldGo) {

      await addRegistration({ variables: { input: newAccount } }).then((async () => {
        setError(null);
        //send the correct info to /send route backend for email verification

        await axios.post('/send', {
          username: newAccount.username,
          email: newAccount.email,
          token: newAccount.verify_token
        }).then(() => {
          props.setRegistered(true)
        })

      })).then(async () => {
        console.log('registration success')
        await props.setRegistered(true)
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

  const gohere = e => {
    const url = window.location
    const amazon = (window as any).amazon
    e.preventDefault();
    const options = {} as any
    options.scope = 'profile';
    options.scope_data = {
      'profile': { 'essential': false }
    };
    amazon.Login.authorize(options, (res) => {
      amazon.Login.retrieveProfile(res.access_token, async (response) => {
        const name = response.profile.Name;
        const email = response.profile.PrimaryEmail;
        const custID = response.profile.CustomerId;

        const awsSetup = {
          name,
          email,
          pw: email + custID
        }
        await handleRegister(awsSetup)
      })
    });
  }


  return (

    <div className="login-container container">
      <div className="login-content">

        <LoginRegister from="parent" show="top" />

        <form onSubmit={() => handleRegister()}>

          <label htmlFor="login-username">
            <p className="real-label">Name</p>
            <input id="login-username"
              defaultValue={account.user}
              pattern="^[A-Za-z]+([A-Za-z ][A-Za-z]+)*$"
              title="letters are only allowed"
              onChange={updateFields} name='user'
              onFocus={e => changeLabel(e.target)}
              required />
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

          <LoginRegister from="parent" show="bottom" />


          <button className="login-button" type='submit'>Register Parent Account</button>
          <Agree />


        </form>
        {terror && (
          <div className="error-area"><span onClick={close} className="close">×</span>
            {terror === 1 ? <p className="error">Email is taken</p> :
              terror === 2 ? <p className="error">Please enter a valid email address</p> :
                terror === 3 && <p className="error">Your passwords do not match. Please try again</p>}
          </div>
        )}

      <LoginWith gohere={gohere} />
      
      </div>
    </div>
  );
}

export default function ParentRegister() {

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
