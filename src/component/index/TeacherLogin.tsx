import React, { useState, useContext, useEffect } from 'react';
import { Handle_Teacher_Login } from '../../query/query';
import { useApolloClient} from '@apollo/react-hooks';
import { encryptMe, signMe } from '../../helpers';
import '../../styles/login.styl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom'
import { useLocation, useHistory } from 'react-router-dom';
import LoginRegister from './LoginRegisterLinks';

function TeacherLoginForm() {

  const bgCrinkle = require('../../img/cloudpattern.png');
  const bgWave = require('../../img/triangle.png');

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
  const handleLogin = async () => {
    event.preventDefault();

    const rememberMe = document.getElementById('rememberMe') as HTMLInputElement;
    let loginData = {
        email: val.email,
        password: val.password
    }

    await client.query({
      query: Handle_Teacher_Login,
      variables: loginData
    }).then(async (e) => {


      const newToken = await signMe(e.data.TeacherLogin.apiKey).then((api) => {
        return api;
      });

      let teacherid = e.data.TeacherLogin.teacher_id;
      let newUser = await encryptMe(teacherid);

      let a = new Date();
      a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365);


      //remember me section for having it session vs a year
      if (rememberMe.checked === false) {
        document.cookie = `teacherID=${newUser};samesite`;
        document.cookie = `tch=${newToken};samesite`;

      } else {
        document.cookie = `teacherID=${newUser};samesite; expires=${a.toUTCString()}`;
        document.cookie = `tch=${newToken};samesite; expires=${a.toUTCString()}`;
      }

    }).then(() => {
      return history.push('/teacher-dashboard');
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




  return (<div className={classy.myBG + ' login-container container'}>
    <div className="login-content">
      <LoginRegister login={true} from="teacher" show="top"/>
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
        <LoginRegister login={true} from="teacher" show="bottom"/>
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

function TeacherLogin() {
  const [account, setValue] = useState({
    userid: null,
    loggedin: false
  });

  const fromChild = (update) => {
    setValue(update);
  };

  return (
    <div>
      <TeacherLoginForm email={account.email} password={account.password} texterror={account.texterror} updateParent={fromChild} />
    </div>
  );
}

export default TeacherLogin;