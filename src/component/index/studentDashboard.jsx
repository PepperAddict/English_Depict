import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
const id = cookieParser('student_id', true);
import {getStudentInfo} from '../../query/query';
import AddBlog from './AddBlog.jsx';
import ViewBlogs from './ViewBlogs.jsx';
import Vocabulary from './Vocabulary.jsx';
import '../../styles/blog.styl';

export default function StudentDashboard() {
  const {loading, error, data } = useQuery(getStudentInfo, {variables: {student_id: id}})
  const student = data ? data.getStudentByID[0] : false;
  const [dashboard, setDashboard] = useState('')



  useEffect(() => {

    let pathname = window.location.pathname;
    switch (true) {
      case pathname.includes('add_blog'):
        setDashboard({
          addBlog: true
        });
        break;
      case pathname.includes('blogs'):
        setDashboard({
          viewBlog: true
        });
        break;
      case pathname.includes('settings'):
        setDashboard({
          settings: true
        })
      default: 
        setDashboard({
          welcome: true
      })
    }
  }, [])

  const addVocabulary = async word => {
    var regex = /[.,():;\s]/g;
    var result = word ? word.replace(regex, '') : false
    await fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${result}?key=${process.env.REACT_APP_MERR}`)
    .then((res) => {
      return res.json()
    }).then((e) => {
      setDashboard({...dashboard, vocabulary: result, definition: e[0].shortdef});
      console.log(dashboard)
    }).catch((e) => console.log())

    
  }


  return(
    <div className="student-container">
      <div className="student-sidebar">
        <a href="/student">Dashboard</a>
        <a href="/student/add_blog">Add a Blog</a>
        <a href="/student/blogs">View Blog</a>
      </div>
      {loading? 'loading' : error ? 'error' : 
      data && dashboard.welcome ? (

        <div>Welcome {student.name || student.username} </div>
      ) :
      data && dashboard.addBlog ?  <AddBlog student_id={id}/> :
      data && dashboard.viewBlog ? <ViewBlogs student_id={id} addVocabulary={addVocabulary}/> :
      data && dashboard.setting ? ('settings') : ('')}
      {dashboard.vocabulary ? <Vocabulary vocab={dashboard.vocabulary} definition={dashboard.definition} addVocabulary={addVocabulary} /> : ''}
    </div>
  )
}