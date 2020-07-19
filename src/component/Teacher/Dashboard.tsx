import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getUserByID } from '../../query/query';

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

  const userId = parseInt(cookieParser('userID', true));
  const { loading, error, data } = useQuery(getUserByID, { variables: { userId: userId } });
  const [student_id, setStudent_id] = useState(null);


  return (
    <Router>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          {data && <DashboardSidebar username={data.getUser.username} email={data.getUser.email} />}

        </div>

        {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
          <TeacherContext.Consumer>
            {context => (
              <div className="dashboard-content">
                {!data.getUser.verified && <div className="top-banner">Please verify your account</div>}
                <Switch>
                  <Route path="/dashboard/add_student" render={(props) => <DashboardStudent {...props} userId={userId} students={data.getUser.students} />} />
                  <Route path="/dashboard/settings" render={(props) => <Settings {...props} userId={userId} students={data.getUser.students}/>} />
                  <Route path="/dashboard/task" exact render={(props) => <TaskFront {...props} students={data.getUser.students} teacher_data={data.getUser} />} />
                  <Route path="/dashboard/student-info" render={(props) => <IndividualStudent {...props} teacher_id={userId} student_id={student_id} setStudentID={setStudent_id} data={data.getUser} />} />
                  <Route path="/dashboard" exact render={(props) => < TeacherDashboard {...props} vocabs={data.getUser.vocabularies} data={data.getUser} userId={userId} students={data.getUser.students} />} />

                  {/* Tasks Area */}
                  <Route path="/dashboard/task/CIC" render={(props) => <ImageClue {...props} teacher_data={data.getUser} students={data.getUser.students} />} />
                  <Route path="/dashboard/task/WOTD" render={(props) => <TaskWOTD {...props} teacher_data={data.getUser} />} />
                  <Route path="/dashboard/task/current" render={(props) => <SelectedTaskView {...props} currentTask={context.task} setTask={context.setTask}/>} />
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
