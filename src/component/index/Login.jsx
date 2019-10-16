import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Handle_Login } from '../../query/query';
import { useQuery, useMutation, useLazyQuery, useApolloClient } from '@apollo/react-hooks';




function LoginForm(props) {
  const client = useApolloClient();
  const [val, setValu] = useState({
    email: 'example@example.com',
    password: 'password',
    texterror: {
      status: false,
      text: ''
    },
  })

  let message = false;

  const handleLogin = async (e) => {
    e.preventDefault();
    await client.query({
      query: Handle_Login, 
      variables: {
        email: val.email, 
        password: val.password
      }
    }).then((e) => {
      console.log(e)
    }).catch((e) => {
      if (e.message.includes('noEmail')) {
        setValu({
          ...val,
          texterror: {
            status: true, 
            text: 'Unknown email address. Would you like to register instead? <a href="/register">Click here</a> to register.'
          }
        })
      } else if (e.message.includes('incorrectPassword')) {
        setValu({
          ...val,
          texterror: {
            status: true, 
            text: `YOUR! PASSWORD! DOOESN'T MATCH! AT! ALL!`
          }
        })
      }
    })

    // if (error) {
    //   console.log(error)
    // }

    // if (data) {
    //   console.log(data)
    //   if (data.login === null) {
    //     setValu({
    //       texterror: {
    //         status: true, 
    //         text: `Sorry, the email doesn't exist. Would you like to register instead?`
    //       }
    //     })
    //   } else if (data.login.email === 'incorrectPassword') {
    //     setValu({
    //       texterror: {
    //         status: true, 
    //         text: `The password didn't match. Please retry.`
    //       }
    //     })
    //   } else {
    //     setValu({
    //       texterror: {
    //         status: false, 
    //         text: ''
    //       }
    //     })
    //   }
    // }

  }

  const updateFields = e => {

    setValu({
      ...val, [e.target.name]: e.target.value || ''
    })
  }


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
    {val.texterror.status === true ? (<p>{val.texterror.text}</p>) : ''}
  </div>


  )
}

function Login(e) {
  const [account, setValue] = useState({
    email: 'example@example.com',
    password: 'password',
    texterror: {
      status: false,
      text: ''
    },
  });

  const fromChild = (update) => {
    setValue(update)
  }

  return (
    <div>
      < LoginForm email={account.email} password={account.password} texterror={account.texterror} updateParent={fromChild}/>
    </div>)
}

export default Login;