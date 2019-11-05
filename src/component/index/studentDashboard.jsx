import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
const id = cookieParser('student_id', true);
import { getStudentInfo } from '../../query/query';
import AddBlog from './AddBlog.jsx';
import ViewBlogs from './ViewBlogs.jsx';
import Vocabulary from './Vocabulary.jsx';
import VocabBucket from './VocabBucket.jsx';
import StudentSettings from './StudentSettings';
import '../../styles/blog.styl';
import moment from 'moment';


export default function StudentDashboard() {
  const [currentDate, setDate] = useState(moment().format('dddd, MMMM Do YYYY'));

  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: id } })
  const student = data ? data.getStudentByID[0] : false;
  const [dashboard, setDashboard] = useState({
    options: 'welcome',
    newVocab: new Array()
  })

  useEffect(() => {
    console.log(currentDate)

    let pathname = window.location.pathname;
    switch (true) {
      case pathname.includes('add_blog'):
        setDashboard({
          ...dashboard, options: 'addblog'
        });
        break;
      case pathname.includes('blogs'):
          console.log('is this working again?')
        setDashboard({
          ...dashboard, options: 'blogs'
        });
        break;
      case pathname.includes('settings'):
        setDashboard({
          ...dashboard, options: 'settings'
        });
        break;
      default:
        setDashboard({
          ...dashboard, options: 'welcome'
        })
    }
  }, [])

  const addVocabulary = async word => {
    var regex = /[.,():;\s]/g;
    var resultfirst = word ? word.replace(regex, '') : false;
    var result = word ? resultfirst.charAt(0).toUpperCase() + resultfirst.slice(1) : false;
    await fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${result}?key=${process.env.REACT_APP_MERR}`)
      .then((res) => {
        return res.json()
      }).then((e) => {
        setDashboard({ ...dashboard, vocabulary: result, definition: e[0].shortdef });
      }).catch((e) => console.log())
  }

  const showVocab = word => {
    setDashboard({...dashboard, newVocab: [...dashboard.newVocab, word]});
  }

  return (
    <div className="student-container">
      <div className="student-sidebar">
        <a href="/student">Dashboard</a>
        <a href="/student/add_blog">Add a Blog</a>
        <a href="/student/blogs">View Blog</a>
        <a href="/student/settings">Settings</a>
      </div>
      {loading ? 'loading' : error ? 'error' :
        data && dashboard.options === 'welcome' ? (

          <div> <span className="avatar">
            <img className="avatar-image" src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : 'https://i.imgur.com/mczI9bfg.jpg'} />
            </span>
             Welcome {student.name || student.username} 
             Today is {currentDate}
          
          </div>
        ) :
          data && dashboard.options === 'addblog' ? <AddBlog student_id={id} /> :
            data && dashboard.options === 'blogs' ? <ViewBlogs student_id={id} addVocabulary={addVocabulary} /> :
              data && dashboard.options === 'settings' ? <StudentSettings student_id={id} avatar={data.getStudentByID[0].avatar}/> : ('')}
      <div className="student-vocabulary">
      {dashboard.vocabulary ?
        <Vocabulary student_id={id} showVocab={showVocab} vocab={dashboard.vocabulary} definition={dashboard.definition} addVocabulary={addVocabulary} /> : ''}
        {data ? <VocabBucket student_id={id} showVocab={showVocab} vocab={data.getStudentByID[0].vocabularies} definition={dashboard.definition} /> : '' }
         {dashboard.newVocab ? dashboard.newVocab.map((word, key) => {
           return <p key={key}> {word}</p>
         }) : ''} </div>
    </div>
  )
}