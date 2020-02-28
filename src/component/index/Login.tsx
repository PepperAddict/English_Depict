import React, { useState } from 'react';
import { Handle_Login } from '../../query/query';
import { useApolloClient } from '@apollo/react-hooks';
import { encryptMe, signMe } from '../../helpers';
import '../../styles/login.styl';
import {createUseStyles} from 'react-jss';


function LoginForm() {
  const bgCrinkle = require('../../img/crinkle.png');
  const bgWave = require('../../img/wave.png');

  const bg = createUseStyles({
    myBG: {
      backgroundImage: `url(${bgCrinkle.images[bgCrinkle.images.length -1].path})`
    },
    myBGTwo: {
      backgroundImage: `url(${bgWave.images[bgWave.images.length -1].path})`,
      backgroundSize: 'cover'
    }
  })

  const classy = bg();

  const client = useApolloClient();
  const [val, setValu] = useState({
    email: 'example@example.com',
    password: 'password',
    texterror: {
      status: false,
      text: ''
    }
  });
  const [error, setError] = useState(null); // 1 is no email in database, 2 is wrong password

  const handleLogin = async (e) => {
    e.preventDefault();

    await client.query({
      query: Handle_Login,
      variables: {
        email: val.email,
        password: val.password
      }
    }).then(async (e) => {
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
        setError(1);
      } else if (e.message.includes('incorrectPassword')) {
        setError(2);
      } else {
        console.log(e);
      }
    });
  };

  const updateFields = e => {

    setError(null);
    setValu({
      ...val, [e.target.name]: e.target.value || ''
    });
  };


  return (<div className={classy.myBG + ' login-container'}>
    <div className="login-content">
      <a href="/" className="logo-container-link"><img className="logo-center" src="/images/logo-192.png" alt="logo" /></a>
      <h1>Teacher Login</h1>

      <form onSubmit={(e) => handleLogin(e)}>
        <label
          htmlFor="login-email">E-mail Address</label>
        <input
          id="login-email"
          name='email'
          onChange={updateFields}
          placeholder='email' />

        <label htmlFor="login-passwordOne">Password</label>
        <input
          id="login-passwordOne"
          defaultValue={val.username}
          onChange={updateFields}
          name='password'
          type="password"
          placeholder='password' />


        <button className="login-button" type='submit'>Login</button>
      </form>
      <hr />
      {error === 1 ? (<p className="error">The email: <i>{val.email}</i> is not in our system. Please check and try again.<br/>
       <a href="/register">Did you mean to register?</a></p>) :
        error === 2 && <p className="error">Incorrect password. Please try again.</p>
      }
      
    </div>
    <div className={classy.myBGTwo + ' bottom'}>
      <div className="bottom-content">
        <ul>
          <li><a href="/register">Register For a teacher’s account</a></li>
          <li><a href="/student_login">Student Login</a></li>
        </ul>
        </div>
    </div>

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