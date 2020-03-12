import React, { Fragment, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query, withApollo } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MyContext } from './Context';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    freezeResults: true
  }),
  assumeImmutableResults: true
});

// components
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import Dashboard from '../Teacher/Dashboard';
const RegWithClient = withApollo(Register);
import StudentLogin from '../Student/StudentLogin';
import StudentDashboard from '../Student/studentDashboard';
import Verify from './Verify';



function App() {
  const [teacherid, setValue] = useState('testing if this works')
  const [studentid, setStudentID] = useState(null)

  return (
    <ApolloProvider client={client}>
      <MyContext.Provider value={{teacherid, setValue: e => {setValue(e)}}}>
        <Router>
          <Fragment>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>

            <Route path="/dashboard/:page?">

              <Dashboard />
            </Route>


            <Route exact path="/register">
              <RegWithClient />
            </Route>
            <Route path="/student_login">
              <StudentLogin />
            </Route>
            <Route path="/student/:page?">
              <StudentDashboard />
            </Route>
            <Route path="/send">
              <Verify />
            </Route>
          </Fragment>
        </Router>
      </MyContext.Provider>
    </ApolloProvider>
  )
};
ReactDOM.render(
  <App />,
  document.getElementById('app')
);


// if (module.hot) {
//   module.hot.accept();
// }