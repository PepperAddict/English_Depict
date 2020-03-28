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
import ShowCard from './StudentCard';
import Tasks from './TeacherTasks';
import Settings from './Settings';
import VocabTask from './VocabTask';

export default function Dashboard() {

  const userId = parseInt(cookieParser('userID', true));
  const { loading, error, data } = useQuery(getUserByID, { variables: { userId: userId } });
  const [info, setInfo] = useState('');
  const [student_id, setStudent_id] = useState(null);
  if (data) {
    console.log(data)
  }
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
    }
  }, []);


  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        {data && <DashboardSidebar username={data.getUser.username} email={data.getUser.email} />}
      </div>

      {loading ? <p>loading</p> : error ? <p>{error.message}</p> : (
        <div className="dashboard-content">
          {!data.getUser.verified && <div className="top-banner">Please verify your account</div>}

          {info.buttonAdd ? (<div> {data.getUser.students.length > 0 ?
            (<div className="student-container">
              <ShowCard data={data.getUser} userId={userId} setStudentID={setStudent_id} students={data.getUser.students} />

              <AddStudent /></div>) : (<AddStudent />)}
          </div>) :
            info.settings ? (<Settings userId={userId} />) :
              info.task ? <Tasks students={data.getUser.students} teacher_data={data.getUser} /> :
                info.student ? (<IndividualStudent teacher_id={userId} student_id={student_id} data={data.getUser} />) : (
                  <div>
                    {data.getUser.students.length > 0 ? (
                      <Fragment>

                        <ShowCard students={data.getUser.students} data={data.getUser} userId={userId} setStudentID={setStudent_id} />
                        
                        {data.getUser.vocabularies ? 
                        <VocabTask vocabs={data.getUser.vocabularies}/> : <p>no words in students' vocabulary bucket</p>}
                      </Fragment>) : (<AddStudent />)}
                  </div>
                )}
        </div>
      )}
    </div>
  );
}
