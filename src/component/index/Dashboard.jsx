import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getUserByID } from '../../query/query'
import AddStudent from './AddStudent.jsx';
import '../../styles/basic.styl';
import DashboardSidebar from './DashboardSidebar.jsx';
import IndividualStudent from './Content/IndividualStudent.jsx'

function ShowStudent({ student, index, setStudentID }) {
  const sendStudent = e => {
    location.replace('/dashboard/student-info=' + student.student_id)
  }
  return (
    <div onClick={sendStudent}>
      <div className="avatar">
        <img className="avatar-image" src={student.avatar} />
      </div>
      Student: {student.name ? student.name : student.username} <small>u/{student.username}</small>.
    </div>
  )
}

function ShowCard({ data, userId, setStudentID }) {

  return (<div className="student-card">Your Students:
    {data.students.map((student, index) => {
    return <ShowStudent key={index} index={index} student={student} teacherID={userId} setStudentID={setStudentID}/>
  })} </div>
  )
}

export default function Dashboard() {
  const userId = cookieParser('userID', true);
  const { loading, error, data } = useQuery(getUserByID, { variables: { userId: userId } });
  const [info, setInfo] = useState('')
  const [student_id, setStudent_id] = useState(null)

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
        })
        break;
      case pathname.includes('student-info'):
        setInfo({
          student: true
        })
        break;
      case pathname.includes('student-mode'):
        setInfo({
          studentMode: true
        })
    }
  }, [])
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
  }

  const logout = e => {
    clearCookies('token');
    clearCookies('userID')
    if (info.studentMode) {
      location.replace('/student_login')
    } else {
      location.replace('/')
    }
  }


  return (
    <div>
      <DashboardSidebar />
      <button onClick={logout} >Logout</button>
      {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
        <div className="dashboard-content">
          {info.buttonAdd ? (<div> {data.getUser.students.length > 0 ? (<div><ShowCard data={data.getUser} userId={userId} /> <AddStudent /></div>) : (<AddStudent />)} </div>) :
            info.settings ? (<p>meeeoooowww</p>) :
              info.student ? (<IndividualStudent teacher_id={userId} student_id={student_id} data={data.getUser} />) : (
                info.studentMode ? (
                  <div>Hello {data.getUser.name || data.getUser.username}, you're logged in as a teacher.
                    Would you like to logout?
                <button onClick={logout} >Logout</button>
                  </div>
                ) :
                  <div>
                    hi {data.getUser.username},
                  You have {(data.getUser.students.length) ? data.getUser.students.length : '0'} students.
                  {data.getUser.students.length > 0 ? (<ShowCard data={data.getUser} userId={userId} setStudentID={setStudent_id} />) : (<AddStudent />)}

                  </div>
              )}

        </div>
      )}
    </div>
  )
}
