import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getUserByID } from '../../query/query';
import AddStudent from './AddStudent.jsx';
import '../../styles/basic.styl';
import '../../styles/teacherDashboard.styl';
import '../../styles/teacher_sidebar.styl';
import DashboardSidebar from './Display/DashboardSidebar.jsx';
import IndividualStudent from './Content/IndividualStudent.jsx';
import ShowCard from './Display/StudentCard.jsx';
import Tasks from './Content/TeacherTasks.jsx';
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

          <button type="button"><span><img src={settingsLogo} alt="Go to Settings" /></span> Settings</button>
          <button type="button" onClick={logout}><span><img src={logoutLogo} alt="Logout" /></span> Logout</button>

        </nav>

      </div>

      {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
        <div className="dashboard-content">
          {info.buttonAdd ? (<div> {data.getUser.students.length > 0 ?
            (<div>
              <ShowCard data={data.getUser} userId={userId} />
              <AddStudent /></div>) : (<AddStudent />)} </div>) :
            info.settings ? (<p>meeeoooowww</p>) :
              info.task ? <Tasks students={data.getUser.students} teacher_data={data.getUser} /> :
                info.student ? (<IndividualStudent teacher_id={userId} student_id={student_id} data={data.getUser} />) : (
                  info.studentMode ? (
                    <div>Hello {data.getUser.name || data.getUser.username}, you′re logged in as a teacher.
                    Would you like to logout?
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
