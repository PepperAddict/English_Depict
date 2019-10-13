import React, {useState, useEffect} from 'react';
import { Button, Form } from 'semantic-ui-react';
import {Get_All_Emails, Handle_Login, Match_Email} from '../../query/query';
import {useQuery, useMutation} from '@apollo/react-hooks';


function checkEmail({check_email}) {
  return(
    <div> </div>
  )
}

function LoginForm (props) {
  const [val, setValu] = useState(props)

  const {loading, error, data} = useQuery(Get_All_Emails);
  // const [loginNow, {newData}] = useMutation(Handle_Login)

  const handleLogin = e => {
    let bunchesOfErrors = [];
    let loginWith = {
    }
    // let results = []
    // let toSearch = account.email;
    // for (let i=0; i<data.getCompleteUsers.length; i++) {
    //   for(let key in data.getCompleteUsers[i]) {
    //     if(data.getCompleteUsers[i][key].indexOf(toSearch)!=-1) {
    //       results.push(data.getCompleteUsers[i]);
    //     }
    //   }
    // }
    // if (results.length === 0) {
    //   bunchesOfErrors.push('This email doesnt exist. Would you like to register for an account?')
    //   setValue({
    //     error: {
    //       status: true, 
    //       text: bunchesOfErrors
    //     }
    //   })
    // } else {
    //   setValue({
    //     error: {
    //       status: false
    //     }
    //   })
    // }

    // if (bunchesOfErrors.length === 0) {
    //   console.log('no errors lets continue on')
    // }

  }
  // useEffect(() => {
  //   setValue(account)
  // }, [account] )

  return ( <div>
    {loading ? <p>Loading</p> :  (error) ? <p>Error</p> :
    <Form onSubmit={handleLogin}>

    <Form.Field className="login">
      <label htmlFor="login-email">E-mail Address</label>
      <input id="login-email" name='email' defaultValue={val.username} onChange={e => {const newObj = {email: e.target.value}; setValu(newObj)}} placeholder={props.email}/>
    </Form.Field>
    <Form.Field className="login">
      <label htmlFor="login-passwordOne">Password</label>
      <input id="login-passwordOne" defaultValue={val.username} onChange={e => {const newObj = {password: e.target.value}; setValu(newObj)}} name='password' type="password" placeholder='password' />
    </Form.Field>

    <Button className="login-button" type='Login'>Login</Button>

  </Form>
}

  </div>
    
    
  )
}

export default function Login (e) {
  const [account, setValue] = useState({
    email: '',
    password: '',
    error: {
      status: false, 
      text: ''
    }
  });

return (
<div>
< LoginForm email={account.email} password={account.password}  />
</div>)
}

