import React, { Fragment, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query, withApollo } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StudentProvider, TeacherProvider } from './Context';
import WelcomeNav from './WelcomeNav';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({
    freezeResults: true
  })
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
import Contact from './Contact';
import AlexaGet from '../API/alexa-api'


function App() {

  return (
    <ApolloProvider client={client}>
      <Router> 
        <Route path="/api/alexa/:page?">
          <AlexaGet />
          </Route>

      <WelcomeNav />

        <Fragment>

          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>

          <TeacherProvider>
            <Route path="/dashboard/:page?">
              <Dashboard />
            </Route>
          </TeacherProvider>

          <Route exact path="/register">
            <RegWithClient />
          </Route>
          <Route path="/student_login">
            <StudentLogin />
          </Route>
          <StudentProvider>
            <Route path="/student/:page?">
              <StudentDashboard />
            </Route>
          </StudentProvider>
          <Route path="/verify">
            <Verify />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Fragment>
      </Router>

    </ApolloProvider>
  )
};
ReactDOM.render(
  <App />,
  document.getElementById('app')
);


if ((module as any).hot) {
  (module as any).hot.accept();
}