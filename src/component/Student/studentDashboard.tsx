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
import { StudentContext } from '../index/Context';
import StudentTasks from './StudentTasks';
import StudentTask from './IndividualTask';


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



  return (
    <div className="student-container">



      {loading ? 'loading' : error ? 'error' :
        data && (
          <StudentContext.Consumer>
            {context => (
              <Fragment>

                <Sidebar />

                <Switch>
                  <Route path="/student" exact render={(props) => <WelcomeStudent {...props} student={student} data={data} />} />
                  <Route path="/student/settings" render={(props) => <StudentSettings {...props} student_id={id} avatar={data.getStudentByID[0].avatar} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username} />} />


                  {/* Blog */}
                  <Route path="/student/add-blog" render={(props) => <AddBlog {...props} student_id={id} name={data.getStudentByID[0].name} username={data.getStudentByID[0].username} />} />
                  <Route path="/student/blog" render={(props) => <ViewBlogs {...props} student_id={id} addVocabulary={addVocabulary} blogs={data.getStudentByID[0].blogs} />} />
                  <Route path="/student/edit-blog" render={(props) => <EditBlog {...props} student_id={id} />} />
                  <Route path="/student/view-blog" render={(props) => <ViewComments {...props} addVocabulary={addVocabulary} student_id={id} />} />
                  {console.log(data.getStudentByID[0])}
                  {/* Tasks aka TODO List */}
                  <Route path="/student/tasks/" exact render={(props) => <StudentTasks {...props} tasks={data.getStudentByID[0].tasks} /> } />
                  <Route path="/student/tasks/task" render={(props) => <StudentTask {...props} content={context.task}/>} />
                </Switch>

                <Student_DashboardSidebarTwo data={data} student_id={id} />
              </Fragment>
            )}
          </StudentContext.Consumer>

        )}
    </div>

  );


}
