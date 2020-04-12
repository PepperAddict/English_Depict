import React, { useState, useEffect, Fragment } from 'react';
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

import Sidebar from './Student_DashboardSidebar';

import Student_DashboardSidebarTwo from './Student_DashboardSidebarTwo';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WelcomeStudent from './Dashboard-Welcome';


export default function StudentDashboard() {

  const { loading, error, data } = useQuery(getStudentInfo, { variables: { student_id: id } });
  const student = data ? data.getStudentByID[0] : false;
  const [dashboard, setDashboard] = useState({
    options: 'welcome',
    newVocab: new Array()
  });




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



      {loading ? 'loading' : error ? 'error' :
        data && (
          <Fragment>
            <div className="sidebar">
              <Sidebar />
              <button type="button" onClick={logout}>Logout</button>
            </div>
            <Switch>
              <Route path="/student" exact render={(props) => <WelcomeStudent {...props} student={student} data={data} />} />
              <Route path="/student/add-blog" render={(props) => <AddBlog {...props} student_id={id} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username} />} />
              <Route path="/student/blog" render={(props) => <ViewBlogs {...props} student_id={id} addVocabulary={addVocabulary} blogs={data.getStudentByID[0].blogs} />} />
              <Route path="/student/settings" render={(props) => <StudentSettings {...props} student_id={id} avatar={data.getStudentByID[0].avatar} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username} />} />
              <Route path="/student/edit-blog" render={(props) => <EditBlog {...props} student_id={id} />} />
              <Route path="/student/view-blog" render={(props) => <ViewComments {...props} addVocabulary={addVocabulary} student_id={id} />} />
            </Switch>

            <Student_DashboardSidebarTwo data={data} student_id={id} />
          </Fragment>
        )}
    </div>

  );


}
