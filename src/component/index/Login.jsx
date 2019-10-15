import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Handle_Login } from '../../query/query';
import { useQuery, useMutation } from '@apollo/react-hooks';



function LoginForm(props) {
  const [val, setValu] = useState(props)
  const { loading, error, data } = useQuery(Handle_Login, { variables: { email: val.email, password: val.password } })

  const handleLogin = e => {
    let bunchesOfErrors = [];
    if (data) {
      console.log(data)
    }
  }

  const errorHandle = e => {
    let message = error.toString().split(':')
    return message[message.length -1]
  }
  const updateFields = e => {
    setValu({
      ...val, [e.target.name]: e.target.value || ''
    })
  }

  return (<div>

    <Form onSubmit={handleLogin}>
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
    {error ? (<p> {errorHandle} </p>) : ''}
  </div>


  )
}

function Login(e) {
  const [account, setValue] = useState({
    email: 'example@example.com',
    password: 'Im a string wtf!',
    error: {
      status: false,
      text: ''
    }
  });

  return (
    <div>
      < LoginForm email={account.email} password={account.password} />
    </div>)
}

export default Login;