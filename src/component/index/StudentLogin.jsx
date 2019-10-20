import React, {useState} from 'react';
import {LoginStudent} from '../../query/query';
import {useQuery, useApolloClient} from '@apollo/react-hooks';
import '../../styles/studentLogin.styl'



function StageOne({updateParent}) {
  const client = useApolloClient();
  const [studentInfo, setStudentInfo] = useState({
    username: '', 
    question: '',
    password: '',
    secondPassword: '',
  })

  const usernameSubmit = e => {
    e.preventDefault();
    client.query({
      query: LoginStudent, 
      variables: {
        username: studentInfo.username
      }
    }).then((e) => {
      if (e.data.loginStudent.length > 0) {
        updateParent({
          username: e.data.loginStudent[0].username,
          name: e.data.loginStudent[0].name || e.data.loginStudent[0].username,
          question: e.data.loginStudent[0].question, 
          password: e.data.loginStudent[0].password,
          stage1: false,
          stage2: true})
      }


    }).catch((e) => {
      console.log(e)
    })

  }
  
  return (
<div>
     <form onSubmit={usernameSubmit}>
       <label htmlFor="username">What is your username?</label>
       <input id="username" onChange={e => {setStudentInfo({username: e.target.value})}} />
       <button type="submit">Submit Username</button>
     </form>
</div>
  )
}

function StageTwo({updateParent, question, password, name}) {
  const [questionIt, setQuestion] = useState({question, password});
  const checkAnswer = e => {
    e.preventDefault();
    if (questionIt.password === questionIt.answerCheck) {
      updateParent({...questionIt, stage1: false, stage2: false, stage3: true})
    }
  }
  const check = e => {
    setQuestion({
      ...questionIt, [e.target.name]: e.target.value || ''
    })
  }
return (
  <div>
    Hello {questionIt.name}
    <form onSubmit={checkAnswer}>
      <label htmlFor="question" name="question">{questionIt.question}</label>
      <input id="question" name="answerCheck" onChange={check}></input>
      <button type="submit">Submit Answer</button>
    </form>

  </div>
)
}

function StageThree({updateParent}) {
  const [newPass, setNewPass] = useState({
    class: 'notSelected',
    selected: false,
    pass: ['start']
  })

  

  const itemClick = e => {
    e.preventDefault();
    let passArray = newPass.pass
      if (passArray.includes(e.target.id) === true) {
        setNewPass({...newPass, pass: passArray.filter(j => j !== e.target.id)})
    } else {
      setNewPass({...newPass, pass: [...passArray, e.target.id]})
    }
  }


  return (<div>
    Let's set up a secret password!
    <form>
      <div className="row">

      <span id="icecream" className={ ( newPass.pass.indexOf('icecream') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
        <object type="image/svg+xml" data={require('../../img/icons/icecream.svg')}/>
      </span>

      <span id="apple" className={ ( newPass.pass.indexOf('apple') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
        <object type="image/svg+xml" data={require('../../img/icons/apple.svg')}/>
      </span>

      <span id="bread" className={ ( newPass.pass.indexOf('bread') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
        <object type="image/svg+xml" data={require('../../img/icons/bread.svg')}/>
      </span>

      <span id="candy" className={ ( newPass.pass.indexOf('candy') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
        <object type="image/svg+xml" data={require('../../img/icons/candy.svg')}/>
      </span>

      <span id="cake" className={ ( newPass.pass.indexOf('cake') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
        <object type="image/svg+xml" data={require('../../img/icons/cake.svg')}/>
      </span>

      <span id="chocolate" className={ ( newPass.pass.indexOf('chocolate') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
        <object type="image/svg+xml" data={require('../../img/icons/chocolate.svg')}/>
      </span>


      </div>

      <div className="row">

<span id="clock" className={ ( newPass.pass.indexOf('clock') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/clock.svg')}/>
</span>

<span id="compass" className={ ( newPass.pass.indexOf('compass') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/compas.svg')}/>
</span>

<span id="feather" className={ ( newPass.pass.indexOf('feather') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/feather.svg')}/>
</span>

<span id="cup" className={ ( newPass.pass.indexOf('cup') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/cup.svg')}/>
</span>

<span id="headphone" className={ ( newPass.pass.indexOf('headphone') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/headphone.svg')}/>
</span>

<span id="camcorder" className={ ( newPass.pass.indexOf('camcorder') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/camcorder.svg')}/>
</span>

</div>


<div className="row">

<span id="bowarrow" className={ ( newPass.pass.indexOf('bowarrow') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/bowarrow.svg')}/>
</span>

<span id="fireworks" className={ ( newPass.pass.indexOf('fireworks') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/fireworks.svg')}/>
</span>

<span id="fish" className={ ( newPass.pass.indexOf('fish') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/fish.svg')}/>
</span>

<span id="hydrant" className={ ( newPass.pass.indexOf('hydrant') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/hydrant.svg')}/>
</span>

<span id="map" className={ ( newPass.pass.indexOf('map') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/map.svg')}/>
</span>

<span id="mic" className={ ( newPass.pass.indexOf('mic') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/mic.svg')}/>
</span>

</div>



<div className="row">

<span id="paintbrush" className={ ( newPass.pass.indexOf('paintbrush') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/paintbrush.svg')}/>
</span>

<span id="meat" className={ ( newPass.pass.indexOf('meat') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/meat.svg')}/>
</span>

<span id="pen" className={ ( newPass.pass.indexOf('pen') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/pen.svg')}/>
</span>

<span id="pinecone" className={ ( newPass.pass.indexOf('pinecone') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/pinecone.svg')}/>
</span>

<span id="rocket" className={ ( newPass.pass.indexOf('rocket') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/rocket.svg')}/>
</span>

<span id="shoe" className={ ( newPass.pass.indexOf('shoe') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/shoe.svg')}/>
</span>

</div>
<div className="row">

<span id="tv" className={ ( newPass.pass.indexOf('tv') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/tv.svg')}/>
</span>

<span id="milk" className={ ( newPass.pass.indexOf('milk') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/milk.svg')}/>
</span>

<span id="controller" className={ ( newPass.pass.indexOf('controller') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/controller.svg')}/>
</span>

<span id="wifi" className={ ( newPass.pass.indexOf('wifi') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/wifi.svg')}/>
</span>

<span id="bone" className={ ( newPass.pass.indexOf('bone') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/bone.svg')}/>
</span>

<span id="bow" className={ ( newPass.pass.indexOf('bow') !== -1 ? 'selected' : 'notSelected') } onClick={e => itemClick(e)} >
  <object type="image/svg+xml" data={require('../../img/icons/bow.svg')}/>
</span>

</div>
    </form>
    
  </div>)
}

export default function StudentLogin() {
  const [studentLogin, setStudentLogin] = useState({
    username: '',
    question: '',
    name: '',
    password: '',
    secondPassword: '',
    active: false, 
    stage1: false, 
    stage2: false,
    stage3: true,
    stage4: false, 
  })

  const updateParent = (update) => {
    setStudentLogin(update)
    console.log(studentLogin)
  }
  
  return (
   <div>
     Hi Student! Let's sign in! 
     
     {studentLogin.stage1 ? <StageOne updateParent={updateParent}/> : 
     studentLogin.stage2 ? (<StageTwo 
      username={studentLogin.username} 
      name={studentLogin.name} 
      question={studentLogin.question}
      password={studentLogin.password}
      updateParent={updateParent}/>) : 
     studentLogin.stage3 ?(<StageThree />) : 
     studentLogin.stage4 ? ('stage4') : ('')}

   </div>
  )
}