import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
const id = parseInt(cookieParser('student_id', true));
import { getStudentInfo } from '../../query/query';
import AddBlog from './AddBlog';
import ViewBlogs from '../teacher-student-shared/ViewBlogs';
import Vocabulary from './Vocabulary';
import VocabBucket from './VocabBucket';
import StudentSettings from './StudentSettings';
import EditBlog from './EditBlog';
import ViewComments from '../teacher-student-shared/Comments';
import '../../styles/studentdashboard.styl';
import moment from 'moment';
import Sidebar from './Student_DashboardSidebar';
import StudentTasks from './StudentTasks';
const defaultImage = require('../../img/no-pic.png');


export default function StudentDashboard() {
  const todaysdate = moment();
  const currentDate = todaysdate.format('dddd, MMMM Do YYYY');
  const [dupeWordt, setDupeWord] = useState('');
  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: id } });
  const student = data ? data.getStudentByID[0] : false;
  const [dashboard, setDashboard] = useState({
    options: 'welcome',
    newVocab: new Array()
  });

  const [specialDay, setSpecialDay] = useState(null);
  const [specialDayMessage, setSpecialDayMessage] = useState(null)

  useEffect(() => {
    //Special Day 
    var eventdate = moment('2020-3-17');
    setSpecialDay(eventdate.diff(todaysdate, 'days'));
    setSpecialDayMessage(" Days until St. Patrick's day. Wear green!")

    let pathname = window.location.pathname;
    switch (true) {
      case pathname.includes('add_blog'):
        setDashboard({
          ...dashboard, options: 'addblog'
        });
        break;
      case pathname.includes('blogs'):
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
      case pathname.includes('view-comments'):
        setDashboard({
          ...dashboard, options: 'view-comments'
        });
        break;
      default:
        setDashboard({
          ...dashboard, options: 'welcome'
        });
    }
  }, []);

  const addVocabulary = async word => {
    var regex = /[.,():;\s]/g;
    var resultfirst = word ? word.replace(regex, '') : false;
    var result = word ? resultfirst.charAt(0).toUpperCase() + resultfirst.slice(1) : false;
    await fetch(`https://www.dictionaryapi.com/api/v3/references/sd2/json/${result}?key=${process.env.REACT_APP_MERR}`)
      .then((res) => {
        return res.json();
      }).then((e) => {
        setDashboard({ ...dashboard, vocabulary: result, definition: e[0].shortdef });
      }).catch(() => console.log());
  };

  const showVocab = word => {
    setDashboard({ ...dashboard, newVocab: [...dashboard.newVocab, word] });
  };

  const dupeWord = word => {
    setDupeWord(word);
  };
  const logout = () => {
    clearCookies('student_id');
    clearCookies('student_key');
    location.replace('/');

  };

  const clearCookies = (keyName = null) => {
    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() - 1);

    if (keyName) {
      document.cookie = `${keyName}=; expires=${expireDate.toUTCString()};Path=/;`;
    } else {
      const cookies = document.cookie.split(';');

      cookies.forEach((value) => {
        document.cookie = value.replace(/^ +/, '').replace(/=.*/, '=;expires=' + expireDate.toUTCString());
      });
    }
  };


  return (
    <div className="student-container">
      <div className="sidebar">
        <Sidebar />
        <button type="button" onClick={logout}>Logout</button>
      </div>


        {loading ? 'loading' : error ? 'error' :
          data && dashboard.options === 'welcome' ? (

            <div className="welcome-hero"> <span className="avatar">
              <img className="avatar-image" src={data.getStudentByID[0].avatar ? data.getStudentByID[0].avatar : defaultImage.src} alt={data.getStudentByID[0].name + ' avatar'} />
            </span>
              <h1>Welcome <strong>{student.name ? student.name : student.username}</strong>!</h1>
              <h2>Today is <strong>{currentDate}</strong></h2>

          <h2 className="holiday-theme">{specialDay} {specialDayMessage}</h2>

              {data.getStudentByID[0].message &&
                <h2 className="message">❝{data.getStudentByID[0].message}❞</h2>}
              <StudentTasks tasks={data.getStudentByID[0].tasks}/>
              
            </div>
          ) :
            data && dashboard.options === 'addblog' ? <AddBlog student_id={id} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username} /> :
              data && dashboard.options === 'blogs' ? <ViewBlogs student_id={id} addVocabulary={addVocabulary} blogs={data.getStudentByID[0].blogs} /> :
                data && dashboard.options === 'settings' ? <StudentSettings student_id={id} avatar={data.getStudentByID[0].avatar} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username}/> :
                  data && dashboard.options === 'edit-blog' ? <EditBlog student_id={id} /> :
                    data && dashboard.options === 'view-comments' ? <ViewComments addVocabulary={addVocabulary} student_id={id} /> : null}
        <div className="student-vocabulary">
          {dashboard.vocabulary ?
            <Vocabulary dupeWord={dupeWord} student_id={id} showVocab={showVocab} vocab={dashboard.vocabulary} allVocab={data.getStudentByID[0].vocabularies} definition={dashboard.definition} addVocabulary={addVocabulary} /> : ''}
          {data ? <VocabBucket dupeWord={dupeWordt} student_id={id} showVocab={showVocab} vocab={data.getStudentByID[0].vocabularies} definition={dashboard.definition} addVocabulary={addVocabulary} /> : ''}
          {dashboard.newVocab && dashboard.newVocab.map((word, key) => {
            return <p className="new-vocab" key={key}> {word} <b>New!</b></p>;
          })} </div>
      </div>

  );


}
