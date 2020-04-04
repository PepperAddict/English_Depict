import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getUserByID } from '../../query/query';
import AddStudent from './AddStudent';
import '../../styles/basic.styl';
import '../../styles/teacherDashboard.styl';
import '../../styles/teacher_sidebar.styl';
import DashboardSidebar from './DashboardSidebar';
import IndividualStudent from './IndividualStudent';
import Tasks from './TeacherTasks';
import Settings from './Settings';
import TeacherDashboard from './TeacherDashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
          <Fragment>
            <div className="dashboard-content">
              {!data.getUser.verified && <div className="top-banner">Please verify your account</div>}
              <Route path="/dashboard/add_student" render={(props) => <AddStudent {...props} student={data.getUser.students} data={data.getUser} /> } />
              <Route path="/dashboard/settings" render={(props) => <Settings {...props} userId={userId}/>} />
              <Route path="/dashboard/task" render={(props) => <Tasks {...props} students={data.getUser.students} teacher_data={data.getUser} />} />
              <Route path="/dashboard/student-info" render={(props) => <IndividualStudent {...props} teacher_id={userId} student_id={student_id} data={data.getUser} />} />
              <Route path="/dashboard" exact render={(props) => < TeacherDashboard {...props} vocabs={data.getUser.vocabularies} data={data.getUser} userId={userId} students={data.getUser.students}/>} />
            </div>
          </Fragment>
        )
        }
      </div>
    </Router >
  );
}
