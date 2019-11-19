import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Handle_Login } from '../../query/query';
import { useApolloClient } from '@apollo/react-hooks';
import {encryptMe, signMe} from '../../helpers';



function LoginForm() {
  const client = useApolloClient();
  const [val, setValu] = useState({
    email: 'example@example.com',
    password: 'password',
    texterror: {
      status: false,
      text: ''
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    await client.query({
      query: Handle_Login, 
      variables: {
        email: val.email, 
        password: val.password
      }
    }).then( async (e) => {
      const newToken = await signMe(e.data.login.apiKey).then((api) => {
        return api;
      });
      document.cookie = `token=${newToken}`;
      let userid = e.data.login.id;
      let newUser = await encryptMe(userid); 
      document.cookie = `userID=${newUser};samesite`;
    }).then(() => {
      location.reload();
    }).catch((e) => {
      if (e.message.includes('noEmail')) {
        setValu({
          ...val,
          texterror: {
            status: true, 
            text: `The email: <b>${val.email}</b> is not in the system. Did you mean to register instead? <a href="/register">Click here</a> to register.`
          }
        });
      } else if (e.message.includes('incorrectPassword')) {
        setValu({
          ...val,
          texterror: {
            status: true, 
            text: 'Incorrect password. Please try again.'
          }
        });
      } else {
        console.log(e);
      }
    });
  };

  const updateFields = e => {

    setValu({
      ...val, [e.target.name]: e.target.value || ''
    });
  };


  return (<div>

    <Form onSubmit={(e) => handleLogin(e)}>
      <Form.Field className="login">
        <label
          htmlFor="login-email">E-mail Address</label>
        <input
          id="login-email"
          name='email'
          onChange={updateFields} 
          placeholder='email' />
      </Form.Field>
      <Form.Field className="login">
        <label htmlFor="login-passwordOne">Password</label>
        <input 
          id="login-passwordOne" 
          defaultValue={val.username} 
          onChange={updateFields} 
          name='password' 
          type="password" 
          placeholder='password' />
      </Form.Field>
      <Button className="login-button" type='Login'>Login</Button>
    </Form>
    {val.texterror.status === true ? (<p dangerouslySetInnerHTML={{__html:val.texterror.text}} />) : ''}
  </div>
  );
}

function Login() {
  const [account, setValue] = useState({
    userid: null,
    loggedin: false
  });

  const fromChild = (update) => {
    console.log(update);
    setValue(update);
  };

  return (
    <div>
      <LoginForm email={account.email} password={account.password} texterror={account.texterror} updateParent={fromChild} />
    </div>
  );
}

export default Login;