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
import TeacherDashboard from './ParentDashboard';
import DashboardStudent from './Dashboard-Student';
import SelectedTaskView from './ShowTaskSelected';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageClue from '../Tasks/Teacher_CIC';
import TaskWOTD from '../Tasks/Teacher_WOTD';
import { TeacherContext } from '../index/Context'
import AutoTask from '../Tasks/AutoTask'

export default function Dashboard() {

  const userId = parseInt(cookieParser('userID', true));
  const { loading, error, data } = useQuery(getUserByID, { variables: { userId: userId } });
  const [student_id, setStudent_id] = useState(null);

  return (
    <Router>
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          {data &&  <DashboardSidebar username={data.getUser.username} email={data.getUser.email} />}

        </div>

        {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
          <TeacherContext.Consumer>
            {context => (
              <div className="dashboard-content">
                {!data.getUser.verified && <div className="top-banner">Please verify your account</div>}
                <Switch>
                  <Route path="/parent-dashboard/add_student" render={(props) => <DashboardStudent {...props} userId={userId} students={data.getUser.students} />} />
                  <Route path="/parent-dashboard/settings" render={(props) => <Settings {...props} userId={userId} students={data.getUserByID.students}/>} />
                  <Route path="/parent-dashboard/task" exact render={(props) => <TaskFront {...props} students={data.getUser.students} teacher_data={data.getUser} />} />
                  <Route path="/parent-dashboard/student-info" render={(props) => <IndividualStudent {...props} teacher_id={userId} student_id={student_id} setStudentID={setStudent_id} data={data.getUser} />} />
                  <Route path="/parent-dashboard" exact render={(props) => < TeacherDashboard {...props} vocabs={data.getUser.vocabularies} data={data.getUser} userId={userId} students={data.getUser.students} />} />

                  {/* Tasks Area */}
                  <Route path="/parent-dashboard/task/CIC" render={(props) => <ImageClue {...props} teacher_data={data.getUser} students={data.getUser.students} />} />
                  <Route path="/parent-dashboard/task/WOTD" render={(props) => <TaskWOTD {...props} teacher_data={data.getUser} />} />
                  <Route path="/parent-dashboard/task/current" render={(props) => <SelectedTaskView {...props} currentTask={context.task} setTask={context.setTask}/>} />
                  <Route path="/parent-dashboard/task/auto-task" render={(props) => <AutoTask {...props} teacher_data={data.getUser} students={data.getUser.students}/>} />
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
