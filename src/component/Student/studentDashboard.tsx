import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
const id = parseInt(cookieParser('student_id', true));
import { getStudentInfo } from '../../query/query';
import AddBlog from './AddBlog';
import ViewBlogs from '../teacher-student-shared/ViewBlogs';
import StudentSettings from './StudentSettings';
import EditBlog from './EditBlog';
import ViewComments from '../teacher-student-shared/Comments';
import '../../styles/studentdashboard.styl';
import moment from 'moment';
import Sidebar from './Student_DashboardSidebar';
import StudentTasks from './StudentTasks';
const defaultImage = require('../../img/no-pic.png');
import SpecialDay from './SpecialDay';
import Student_DashboardSidebarTwo from './Student_DashboardSidebarTwo';


export default function StudentDashboard() {
  const todaysdate = moment();
  const currentDate = todaysdate.format('dddd, MMMM Do YYYY');
  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: id } });
  const student = data ? data.getStudentByID[0] : false;
  const [dashboard, setDashboard] = useState({
    options: 'welcome',
    newVocab: new Array()
  });


  useEffect(() => {

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
            <SpecialDay />

            {data.getStudentByID[0].message &&
              <h2 className="message">❝{data.getStudentByID[0].message}❞</h2>}
            <StudentTasks tasks={data.getStudentByID[0].tasks} />

          </div>
        ) :
          data && dashboard.options === 'addblog' ? <AddBlog student_id={id} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username} /> :
            data && dashboard.options === 'blogs' ? <ViewBlogs student_id={id} addVocabulary={addVocabulary} blogs={data.getStudentByID[0].blogs} /> :
              data && dashboard.options === 'settings' ? <StudentSettings student_id={id} avatar={data.getStudentByID[0].avatar} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username} /> :
                data && dashboard.options === 'edit-blog' ? <EditBlog student_id={id} /> :
                  data && dashboard.options === 'view-comments' ? <ViewComments addVocabulary={addVocabulary} student_id={id} /> : null}
      <Student_DashboardSidebarTwo data={data} student_id={id}/>
    </div>

  );


}
