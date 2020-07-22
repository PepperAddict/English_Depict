import React, { useState, useContext, useEffect } from 'react';
import { Handle_Login } from '../../query/query';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { encryptMe, signMe } from '../../helpers';
import '../../styles/login.styl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom'
import { useLocation, useHistory } from 'react-router-dom';

function LoginForm() {

  const bgCrinkle = require('../../img/cloudpattern.png');
  const bgWave = require('../../img/triangle.png');
  const amazon = (window as any).amazon
  //jss portion
  const bg = createUseStyles({
    myBG: {
      backgroundImage: `url(${bgCrinkle.images[bgCrinkle.images.length - 1].path})`,
      backgroundRepeat: 'repeat',
      backgroundSize: '40px'
    },
    myBGTwo: {
      backgroundImage: `url(${bgWave.images[bgWave.images.length - 1].path})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left'
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
  const location = useLocation();
  const history = useHistory();
  const handleLogin = async (awsData = null) => {
    event.preventDefault();

    const rememberMe = document.getElementById('rememberMe') as HTMLInputElement;
    let loginData;

    if (!awsData) {
      loginData = {
        email: val.email,
        password: val.password
      }
    } else {
      loginData = {
        email: awsData.email,
        password: awsData.pw
      }
    }

    await client.query({
      query: Handle_Login,
      variables: loginData
    }).then(async (e) => {
      console.log('login success')

      const newToken = await signMe(e.data.login.apiKey).then((api) => {
        return api;
      });

      let userid = e.data.login.id;
      let newUser = await encryptMe(userid);

      let a = new Date();
      a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365);


      //remember me section for having it session vs a year
      if (rememberMe.checked === false) {
        document.cookie = `userID=${newUser};samesite`;
        document.cookie = `token=${newToken};samesite`;

      } else {
        document.cookie = `userID=${newUser};samesite; expires=${a.toUTCString()}`;
        document.cookie = `token=${newToken};samesite; expires=${a.toUTCString()}`;
      }

    }).then(() => {
      return history.push('/dashboard');
    }).catch((e) => {
      console.log(e)
      if (e.message.includes('noEmail')) {
        setError(1);
      } else if (e.message.includes('incorrectPassword')) {
        setError(2);
      }
    });



  };

  const updateFields = e => {

    setError(null);
    setValu({
      ...val, [e.target.name]: e.target.value || ''
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
          pw: email + custID,
        }
        await handleLogin(awsSetup)
      })
    }

    )
  }



  return (<div className={classy.myBG + ' login-container container'}>
    <div className="login-content">
      <Link to="/" className="logo-container-link">
        <img className="logo-center" src="/images/logo-192.png" alt="logo" />
      </Link>

      <h1>Teacher Portal</h1>
      <a id="LoginWithAmazon" onClick={e => gohere(e)}>
        <img border="0" alt="Login with Amazon"
          src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
          width="156" height="32" />
      </a>

      <form onSubmit={() => handleLogin()}>
        <label
          htmlFor="loginemail" className="emaillabel">
          <p className="real-label">E-mail Address</p>
          <input
            id="loginemail"
            name='email'
            onFocus={e => changeLabel(e.target)}
            onChange={updateFields} />

        </label>

        <label htmlFor="loginpasswordOne" className="passwordlabel">
          <p className="real-label">Password</p>
          <input
            id="loginpasswordOne"
            className="loginpasswordOne"
            defaultValue={val.username}
            onChange={updateFields}
            onFocus={e => changeLabel(e.target)}
            name='password'
            type="password" />
        </label>
        <div className="below-login">
          <label htmlFor="rememberMe">
            <input type="checkbox" id="rememberMe" />
            <span></span>
            Remember Me</label>
          <div className="different-logins">
            <ul>
              <li><Link to="/student_login">Student Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              {/* TODO create reset password */}
              {/* <li><a href="/">Reset password</a></li> */}
            </ul>
          </div>
        </div>

        <button className="login-button" type='submit'>Login</button>
      </form>

      {error && (
        <div className="error-area"> <span onClick={close} className="close">×</span>
          {error === 1 && (<p className="error">The email: <b>{val.email}</b> is not in our system. Please check and try again.</p>) ||
            error === 2 && (<p className="error">Incorrect password. Please try again.</p>)}
        </div>
      )}

    </div>
    {/* <div className={classy.myBGTwo + ' bottom'}>
    </div> */}
  </div>
  );
}

function Login() {
  const [account, setValue] = useState({
    userid: null,
    loggedin: false
  });

  const fromChild = (update) => {
    setValue(update);
  };

  return (
    <div>
      <LoginForm email={account.email} password={account.password} texterror={account.texterror} updateParent={fromChild} />
    </div>
  );
}

export default Login;