import React, { useState, useEffect, Fragment } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_NEWPW } from '../../mutation/mutation';
import { encryptMe, signMe } from '../../helpers';

function ImageForm({ pass, pictureSubmit, itemClick }) {

  return (
    <form className="password-selection" onSubmit={pictureSubmit}>
      <div className="row">
        <span id="icecream" className={(pass.indexOf('icecream') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/icecream.svg')} />
        </span>

        <span id="apple" className={(pass.indexOf('apple') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/apple.svg')} />
        </span>

        <span id="bread" className={(pass.indexOf('bread') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/bread.svg')} />
        </span>

        <span id="candy" className={(pass.indexOf('candy') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/candy.svg')} />
        </span>

        <span id="cake" className={(pass.indexOf('cake') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/cake.svg')} />
        </span>

        <span id="chocolate" className={(pass.indexOf('chocolate') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/chocolate.svg')} />
        </span>


      </div>

      <div className="row">

        <span id="clock" className={(pass.indexOf('clock') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/clock.svg')} />
        </span>

        <span id="bow" className={(pass.indexOf('bow') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/bow.svg')} />
        </span>

        <span id="feather" className={(pass.indexOf('feather') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/feather.svg')} />
        </span>

        <span id="cup" className={(pass.indexOf('cup') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/cup.svg')} />
        </span>

        <span id="headphone" className={(pass.indexOf('headphone') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/headphone.svg')} />
        </span>

        <span id="bone" className={(pass.indexOf('bone') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/bone.svg')} />
        </span>

      </div>


      <div className="row">

        <span id="bowarrow" className={(pass.indexOf('bowarrow') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/bowarrow.svg')} />
        </span>

        <span id="fireworks" className={(pass.indexOf('fireworks') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/fireworks.svg')} />
        </span>

        <span id="fish" className={(pass.indexOf('fish') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/fish.svg')} />
        </span>

        <span id="hydrant" className={(pass.indexOf('hydrant') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/hydrant.svg')} />
        </span>

        <span id="map" className={(pass.indexOf('map') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/map.svg')} />
        </span>

        <span id="mic" className={(pass.indexOf('mic') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/mic.svg')} />
        </span>

      </div>



      <div className="row">

        <span id="paintbrush" className={(pass.indexOf('paintbrush') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/paintbrush.svg')} />
        </span>

        <span id="meat" className={(pass.indexOf('meat') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/meat.svg')} />
        </span>

        <span id="pen" className={(pass.indexOf('pen') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/pen.svg')} />
        </span>

        <span id="pinecone" className={(pass.indexOf('pinecone') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/pinecone.svg')} />
        </span>

        <span id="rocket" className={(pass.indexOf('rocket') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/rocket.svg')} />
        </span>

        <span id="controller" className={(pass.indexOf('controller') !== -1 ? 'selected' : 'notSelected')} onClick={e => itemClick(e)} >
          <object type="image/svg+xml" data={require('../../img/icons/controller.svg')} />
        </span>

      </div>


      <button type="submit">Submit your pictures</button>
    </form>
  )
}


export default function StageThree(props) {
  const [setNewPW, { data }] = useMutation(ADD_NEWPW);
  const [newPass, setNewPass] = useState({
    id: props.id,
    verified: props.verified,
    second_password: props.second_password || false,
    student_key: props.student_key,
    pass: ['start'],
    passTwo: ['start'],
    texterror: false,
    check: false,
  })
  const [error, setError] = useState(false)
  const [count, setCount] = useState(0)

  const pictureSubmit = async e => {
    e.preventDefault();
    let pass = newPass.pass.sort().toString();
    if (newPass.verified) {

      if (pass === newPass.second_password) {
        const newToken = await signMe(newPass.student_key).then((api) => {
          return api
        })
        document.cookie = `student_key=${newToken};samesite`;
        let userid = newPass.id;
        let newUser = await encryptMe(userid);
        document.cookie = `student_id=${newUser};samesite`;
        location.reload();
      } else {
        setCount(count + 1)
        setError(1)
      }
    } else {
      if (!newPass.check) {
        if (newPass.pass.length < 5) {
          setError(2)
        } else {
          setError(false)
          setNewPass({...newPass, check: true})
        }
      } else {
        let passOne = newPass.pass.sort().toString();
        let passTwo = newPass.passTwo.sort().toString();

        if (passOne === passTwo) {
          setNewPW({
            variables: {
              input: {
                student_id: newPass.id,
                second_password: passOne
              }
            }
          }).then(async (response) => {
            console.log(response)
            document.cookie = `student_key=${response.data.UpdateStudentPassword.student_key};samesite`;
            let userid = response.data.UpdateStudentPassword.student_id;
            let newUser = await encryptMe(userid);
            console.log(newUser)
            document.cookie = `student_id=${newUser};samesite`;
          }).then((again) => {
            location.reload();
          }).catch((e) => {
            console.log(e)
          })
        } else {
          setError(3)
          setNewPass({...newPass, check: false, pass: ['start'], passTwo: ['start']})
        }
      }
    }
  }

  const itemClick = e => {

    e.preventDefault();
    if (!newPass.check) {
      let passArray = newPass.pass
      if (passArray.includes(e.target.id) === true) {
        setNewPass({ ...newPass, pass: passArray.filter(j => j !== e.target.id) })
      } else {
        setNewPass({ ...newPass, pass: [...passArray, e.target.id] })
      }
    } else {
      let passArray = newPass.passTwo
      if (passArray.includes(e.target.id) === true) {
        setNewPass({ ...newPass, passTwo: passArray.filter(j => j !== e.target.id) })
      } else {
        setNewPass({ ...newPass, passTwo: [...passArray, e.target.id] })
      }
    }

  }
  const closeit = e => {
    setError(false)
  }
  useEffect(() => {
    setNewPass(newPass)
  }, [])

  return (<div className="password-container">
      <div className="three-dot">• • <span className="active">•</span></div>
    {newPass.verified ? (
    <Fragment>
      <h1>Welcome {props.username}</h1>
      <h2>Please select your password</h2>
      <ImageForm pass={newPass.pass} pictureSubmit={pictureSubmit} itemClick={itemClick} />


    </Fragment>) : (
        <Fragment>
          <h1>Welcome {props.username}</h1>
          {!newPass.check ?
            (<h2>Select at least 4 pictures as your secret password!</h2>) :
            (<h2>Please verify the images you chose by selecting them again.</h2>)}
          <p className="message">{newPass.texterror && newPass.texterror}</p>
          {!newPass.check ?
            (<ImageForm pass={newPass.pass} pictureSubmit={pictureSubmit} itemClick={itemClick} />) :
            (<ImageForm pass={newPass.passTwo} pictureSubmit={pictureSubmit} itemClick={itemClick} />)}
      
        </Fragment>
      )}

      {error && error === 1 && count <= 2 ? <p className="error" onClick={closeit}>Password did not match. Please try again.</p> : 
      error === 1 && count >= 3 ? <p className="error" onClick={closeit}>
      Your password does not match. Please let your teacher know to reset your password.
    </p> : error === 2 ? 
    <p className="error" onClick={closeit}>You only chose {newPass.pass.length - 1} images as your password. Please select more images</p> :
    error === 3 && 
    <p className="error" onClick={closeit}>
      Sorry, your password did not match. Lets start over.
    </p>
  }
  </div>)
}