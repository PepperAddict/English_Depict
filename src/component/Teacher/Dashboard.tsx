import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getUserByID } from '../../query/query';
import AddStudent from './AddStudent';
import '../../styles/basic.styl';
import '../../styles/teacherDashboard.styl';
import '../../styles/teacher_sidebar.styl';
import DashboardSidebar from './DashboardSidebar';
import IndividualStudent from './IndividualStudent';
import ShowCard from './StudentCard';
import Tasks from './TeacherTasks';
import Settings from './Settings';
const settingsLogo = require('../../img/settings.svg');
const logoutLogo = require('../../img/logout.svg');

export default function Dashboard() {
  const userId = parseInt(cookieParser('userID', true));
  const { loading, error, data } = useQuery(getUserByID, { variables: { userId: userId } });
  const [info, setInfo] = useState('');
  const [student_id, setStudent_id] = useState(null);

  useEffect(() => {
    let pathname = window.location.pathname;
    switch (true) {
    case pathname.includes('add_student'):
      setInfo({
        buttonAdd: true
      });
      break;
    case pathname.includes('student_posts'):
      setInfo({
        posts: true
      });
      break;
    case pathname.includes('settings'):
      setInfo({
        settings: true
      });
      break;
    case pathname.includes('student-info'):
      setInfo({
        student: true
      });
      break;
    case pathname.includes('task'):
      setInfo({
        task: true
      });
      break;
    case pathname.includes('student-mode'):
      setInfo({
        studentMode: true
      });
      break;
    }
  }, []);

  //for clearing cookies during logout
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

  const logout = () => {
    clearCookies('token');
    clearCookies('userID');
    if (info.studentMode) {
      location.replace('/student_login');
    } else {
      location.replace('/');
    }
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        {data && <DashboardSidebar username={data.getUser.username} email={data.getUser.email} />}
        <nav className="bottom-nav">

          <button type="button"><span><img src={settingsLogo} alt="Go to Settings" /></span><a href="/dashboard/settings">Settings</a></button>
          <button id="logout" type="button" onClick={logout}><span><img src={logoutLogo} alt="Logout" /></span> Logout</button>

        </nav>
 
      </div>

      {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
        <div className="dashboard-content">
          {info.buttonAdd ? (<div> {data.getUser.students.length > 0 ?
            (<div>
              <ShowCard data={data.getUser} userId={userId} setStudentID={setStudent_id} students={data.getUser.students}/>
              <AddStudent /></div>) : (<AddStudent />)} </div>) :
            info.settings ? (<Settings userId={userId}/>) :
              info.task ? <Tasks students={data.getUser.students} teacher_data={data.getUser} /> :
                info.student ? (<IndividualStudent teacher_id={userId} student_id={student_id} data={data.getUser} />) : (
                  info.studentMode ? (
                    <div>Hello, you are logged in as <b>{data.getUser.name || data.getUser.username}</b>, you′re logged in as a teacher.
                    Would you like to logout and log back in as a student?
                    <button type="button" onClick={logout} >Logout</button>
                    </div>
                  ) :
                    <div>

                      {data.getUser.students.length > 0 ? (<ShowCard students={data.getUser.students} data={data.getUser} userId={userId} setStudentID={setStudent_id} />) : (<AddStudent />)}

                    </div>
                )}

        </div>
      )}
    </div>
  );
}
