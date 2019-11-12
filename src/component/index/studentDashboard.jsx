import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
const id = cookieParser('student_id', true);
import { getStudentInfo } from '../../query/query';
import AddBlog from './AddBlog.jsx';
import ViewBlogs from './ViewBlogs.jsx';
import Vocabulary from './Vocab/Vocabulary.jsx';
import VocabBucket from './Vocab/VocabBucket.jsx';
import StudentSettings from './StudentSettings.jsx';
import EditBlog from './Editblog.jsx'
import '../../styles/studentdashboard.styl';
import moment from 'moment';
const defaultImage = require('../images/no-pic.png')


export default function StudentDashboard() {
  const [currentDate, setDate] = useState(moment().format('dddd, MMMM Do YYYY'));
  const [dupeWordt, setDupeWord] = useState('')
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
      case pathname.includes('edit-blog'):
        setDashboard({
          ...dashboard, options: 'edit-blog'
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
    setDashboard({ ...dashboard, newVocab: [...dashboard.newVocab, word] });
  }

  const dupeWord = word => {
    setDupeWord(word)
  }

  return (
    <div className="student-container">
      <nav className="student-sidebar">
        <a href="/student">Dashboard</a>
        <a href="/student/add_blog">Add a Blog</a>
        <a href="/student/blogs">View Blog</a>
        <a href="/student/settings">Settings</a>
      </nav>
      {loading ? 'loading' : error ? 'error' :
        data && dashboard.options === 'welcome' ? (

          <div className="welcome-hero"> <span className="avatar">
            <img className="avatar-image" src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : defaultImage.src} />
          </span>
            <h1>Welcome <strong>{student.name? student.name : student.username}</strong>!</h1>
            <h2>Today is <strong>{currentDate}</strong></h2>
          </div>
        ) :
          data && dashboard.options === 'addblog' ? <AddBlog student_id={id} /> :
            data && dashboard.options === 'blogs' ? <ViewBlogs student_id={id} addVocabulary={addVocabulary} /> :
              data && dashboard.options === 'settings' ? <StudentSettings student_id={id} avatar={data.getStudentByID[0].avatar} /> :
                data && dashboard.options === 'edit-blog' ? <EditBlog student_id={id} /> : null}
      <div className="student-vocabulary">
        {dashboard.vocabulary ?
          <Vocabulary dupeWord={dupeWord} student_id={id} showVocab={showVocab} vocab={dashboard.vocabulary} allVocab={data.getStudentByID[0].vocabularies} definition={dashboard.definition} addVocabulary={addVocabulary} /> : ''}
        {data ? <VocabBucket dupeWord={dupeWordt} student_id={id} showVocab={showVocab} vocab={data.getStudentByID[0].vocabularies} definition={dashboard.definition} addVocabulary={addVocabulary} /> : ''}
        {dashboard.newVocab && dashboard.newVocab.map((word, key) => {
          return <p className="new-vocab" key={key}> {word} <b>New!</b></p>
        })} </div>
    </div>
  )
}