import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getTeacherByID } from '../../query/query';

import '../../styles/basic.styl';
import '../../styles/teacherDashboard.styl';
import '../../styles/teacher_sidebar.styl';
import DashboardSidebar from './DashboardSidebar';
import IndividualStudent from './IndividualStudent';

import TaskFront from './TaskFront'
import Settings from './Settings';
import TeacherDashboard from './TeacherDashboard';
import DashboardStudent from './Dashboard-Student';
import SelectedTaskView from './ShowTaskSelected';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageClue from './Teacher_CIC';
import TaskWOTD from './Teacher_WOTD';
import { TeacherContext } from '../index/Context'

export default function Dashboard() {

  const userId = parseInt(cookieParser('teacherID', true));
  const { loading, error, data } = useQuery(getTeacherByID, { variables: { teacher_id: userId } });
  const [student_id, setStudent_id] = useState(null);
if (data) console.log(data)

  return (
    <Router>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          {data && <DashboardSidebar username={data.GetTeacher.username} email={data.GetTeacher.email} />}

        </div>

        {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
          <TeacherContext.Consumer>
            {context => (
              <div className="dashboard-content">
                {!data.GetTeacher.verified && <div className="top-banner">Please verify your account</div>}
                <Switch>
                  <Route path="/teacher-dashboard/add_student" render={(props) => <DashboardStudent {...props} userId={userId} students={data.GetTeacher.students} />} />
                  <Route path="/teacher-dashboard/settings" render={(props) => <Settings {...props} userId={userId} students={data.GetTeacher.students}/>} />
                  <Route path="/teacher-dashboard/task" exact render={(props) => <TaskFront {...props} students={data.GetTeacher.students} teacher_data={data.GetTeacher} />} />
                  <Route path="/teacher-dashboard/student-info" render={(props) => <IndividualStudent {...props} teacher_id={userId} student_id={student_id} setStudentID={setStudent_id} data={data.GetTeacher} />} />
                  <Route path="/teacher-dashboard" exact render={(props) => < TeacherDashboard {...props} vocabs={data.GetTeacher.vocabularies} data={data.GetTeacher} userId={userId} students={data.GetTeacher.students} />} />

                  {/* Tasks Area */}
                  <Route path="/teacher-dashboard/task/CIC" render={(props) => <ImageClue {...props} teacher_data={data.GetTeacher} students={data.GetTeacher.students} />} />
                  <Route path="/teacher-dashboard/task/WOTD" render={(props) => <TaskWOTD {...props} teacher_data={data.GetTeacher} />} />
                  <Route path="/teacher-dashboard/task/current" render={(props) => <SelectedTaskView {...props} currentTask={context.task} setTask={context.setTask}/>} />
                </Switch>
              </div>
            )}

          </TeacherContext.Consumer>
        )
        }
      </div>
    </Router >
  );
}
