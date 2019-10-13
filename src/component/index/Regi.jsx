import React, {useState, useEffect} from 'react';
import {useQuery, useMutation, useLazyQuery} from '@apollo/react-hooks';
import {Get_All_Emails, Match_Email} from '../../query/query';
import { Button, Form } from 'semantic-ui-react';


function CheckEmail({updateParent}) {
  const [account, setValue] = useState({
    email: 'example@example.com',
    user: '',
    passwordOne: '',
    passwordTwo: '',
    loading: true,
  });

  const {loading, error, data} = useQuery(Get_All_Emails);
  
  const handleRegister = e => {
    console.log(account.email)
    
    e.preventDefault();
    for (let x of data.getCompleteUsers) {
      if (x.email === account.email) {
        updateParent({forError: {status: true, text: 'This email is taken, would you like to Login instead? <a href="/login">Login Here</a>'}})
      }
    }

  }
  const updateFields = e => {
    setValue({
      ...account, [e.target.name]: e.target.value || ''
    })


  }


  return ( <div>
    {loading ? <p>Loading...</p> : (error) ? <p>Error</p> :
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

  const fromChild = (update) => {
    const newUpdate = update
    console.log(update)
    setVariable(newUpdate)
  }
  const textForError = e => {
    return {__html: e}
  }

  useEffect(() => {
    setVariable(variable)
  }, [variable] )

  return (
    <div className="register">
      <CheckEmail registered={variable.registered} forError={variable.forError} updateParent={fromChild} />
      {variable.forError.status === true ? <div id="errorMessage" dangerouslySetInnerHTML={textForError(variable.forError.text)} /> : ''}
    </div>

  )
}

export default Regi;