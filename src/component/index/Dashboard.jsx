import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { cookieParser } from '../../helpers';
import { getUserByID } from '../../query/query'
import AddStudent from './AddStudent.jsx';
import '../../styles/basic.styl';
import DashboardSidebar from './DashboardSidebar.jsx';

function ShowStudent({ student, index }) {
  return (
    <div className="card-items">
      Student: {(student.name) ? student.name : student.username}. 
    </div>
  )
}

function ShowCard({ data, userId }) {

  return (<div className="student-card">Your Students:
    {data.students.map((student, index) => {
      return <ShowStudent key={index} index={index} student={student} teacherID={userId} />
    })} </div>
  )
}

export default function Dashboard() {
  const userId = cookieParser('userID', true);
  const { loading, error, data } = useQuery(getUserByID, { variables: { userId: userId } });
  const [info, setInfo] = useState('')


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
    }
  }, [])

  return (
    <div>
      <DashboardSidebar />
      {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
        <div className="dashboard-content">
          {info.buttonAdd ? (<div> {data.getUser.students.length > 0 ? (<div><ShowCard data={data.getUser} userId={userId}/> <AddStudent /></div>) : (<AddStudent />) } </div>) :
            info.settings ? (<p>meeeoooowww</p>) : (
              <div>
                hi {data.getUser.username},
                  You have {(data.getUser.students.length) ? data.getUser.students.length : '0'} students.
                  {data.getUser.students.length > 0 ? (<ShowCard data={data.getUser} userId={userId} />) : (<AddStudent />)}

              </div>
            )}

        </div>
      )}
    </div>
  )
}
