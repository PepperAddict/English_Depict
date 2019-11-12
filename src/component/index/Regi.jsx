import React, {useState, useEffect} from 'react';
import {useQuery, useMutation, useLazyQuery} from '@apollo/react-hooks';
import {Get_All_Emails} from '../../query/query';
import {ADD_REGISTRATION} from '../../mutation/mutation';
import { Button, Form } from 'semantic-ui-react';
import Login from './Login.jsx'


function CheckEmail(props) {
  const [account, setValue] = useState({
    email: 'example@example.com',
    user: '',
    passwordOne: '',
    passwordTwo: '',
    loading: true,
  });

  const {loading, error, data} = useQuery(Get_All_Emails);
  const [addRegistration, {newData}] = useMutation(ADD_REGISTRATION);
  
  const handleRegister = e => {
    e.preventDefault();
    const newAccount = {
      username: account.user, 
      email: account.email,
      password: account.passwordOne
    }
    const passwordMatch = (account.passwordOne === account.passwordTwo) ? true : false;

    let bunchesOfErrors = [];
    // handle duplicate emails
    for (let x of data.getCompleteUsers) {
      if (x.email === account.email) {
        bunchesOfErrors.push('This email is taken, would you like to Login instead? <a href="/login">Login Here</a>')
        props.updateParent({forError: {status: true, text: bunchesOfErrors}})
      } 
      else {
        props.updateParent({forError: {status:false}})
      }
    }
    // handle if email doesn't have an @ symbol
    if (!account.email.includes('@')) {
      bunchesOfErrors.push('Please enter a valid email address')
      props.updateParent({forError: {status: true, text: bunchesOfErrors}})
    } else {
      props.updateParent({forError: {status:false}})
    }
    // handle password mismatch
    if (!passwordMatch) {
      bunchesOfErrors.push('Your password does not match please try again')
      props.updateParent({forError: {status: true, text: bunchesOfErrors}})
    } else {
      props.updateParent({forError: {status:false}})
    }

    // no errors mean we can carry on with the registration
    if (bunchesOfErrors.length === 0) {
      addRegistration({variables: {input: newAccount}}).then((e => {
        console.log(e)
        props.setRegistered(true)
      })).catch((err) => {
        console.log(err)
      })
    }
  }

  const updateFields = e => {
    setValue({
      ...account, [e.target.name]: e.target.value || ''
    })
  }

  return ( <div>
    {loading ? <p>Loading...</p> : (error) ? <p>There was a problem. Please go back <a href="/">home</a></p> :
    <div>
                <Form onSubmit={handleRegister}>
                <Form.Field className="login">
                  <label htmlFor="login-username">Username</label>
                  <input id="login-username" defaultValue={account.user} onChange={updateFields} name='user' placeholder={(account.user) ? account.user : 'username'} />
                </Form.Field>
                <Form.Field className="login">
                  <label htmlFor="login-email">E-mail Address</label>
                  <input id="login-email" name='email' defaultValue={account.email} onChange={updateFields} placeholder={account.email}/>
                </Form.Field>
                <Form.Field className="login">
                  <label htmlFor="login-passwordOne">Password</label>
                  <input id="login-passwordOne" defaultValue={account.passwordOne} onChange={updateFields} name='passwordOne' type="password" placeholder={(account.passwordOne) ? account.passwordOne :'password'} minLength="6" maxLength="15" required/>
                </Form.Field>
                <Form.Field className="login">
                  <label htmlFor="login-passwordTwo">Verify Password</label>
                  <input id="login-passwordTwo" defaultValue={account.passwordTwo} onChange={updateFields} name='passwordTwo' type="password" placeholder={(account.passwordTwo) ? account.passwordTwo : 'confirm password'} />
                </Form.Field>

                <Button className="login-button" type='Login'>Submit Registration</Button>

              </Form>

              </div>
            }
  </div>)
}

function Regi() {
  const [variable, setVariable] = useState({
    registered: false, 
    forError: {
      status: false, 
      text: ''
    }
  });
  const [registered, setRegistered] = useState(false)

  const fromChild = (update) => {
    const newUpdate = update
    setVariable(newUpdate)
  }
  const textForError = e => {
    return {__html: e}
  }

  useEffect(() => {
    setVariable(variable)
  }, [variable] )

  return (
    <div>
      {registered ? <Login /> : <div className="register">
      <CheckEmail registered={registered} forError={variable.forError} updateParent={fromChild} setRegistered={setRegistered}/>
      {variable.forError.status === true && 
      variable.forError.text.map((errorsMsg, index) => (
        <p id="errorMessage" dangerouslySetInnerHTML={textForError(errorsMsg)} key={index} /> 
      ))}
    </div>}
    </div>
  )
}

export default Regi;