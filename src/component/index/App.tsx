import React, { Fragment, useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
const { InMemoryCache } = require("apollo-cache-inmemory");
const { HttpLink } = require("apollo-link-http");
import { ApolloProvider, Query, withApollo } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StudentProvider, TeacherProvider } from './Context';
import WelcomeNav from './WelcomeNav';
const isDev = process.env.NODE_ENV === "development";

const client = new ApolloClient({
  link: new HttpLink({
    uri: '/api/2/graphql',
  }),
  cache: new InMemoryCache(),
});

// components
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import ParentRegister from './ParentRegister';
import ParentDashboard from '../Parent/Dashboard';
import TeacherDashboard from '../Teacher/Dashboard';
const ParentRegistrationApollo = withApollo(ParentRegister);
import StudentLogin from '../Student/StudentLogin';
import StudentDashboard from '../Student/studentDashboard';
import Verify from './Verify';
import Contact from './Contact';
import Privacy from './PrivacyPolicy';
import Terms from './Terms';
import TeacherRegister from './TeacherRegister';
const TeacherRegistrationApollo = withApollo(TeacherRegister);
import TeacherLogin from './TeacherLogin';


function App() {

  return (
    <ApolloProvider client={client}>
      <Router> 

      <WelcomeNav />

        <Fragment>

          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/parent-login">
            <Login />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
          <Route exact path="/terms">
            <Terms />
          </Route>

          <TeacherProvider>
            <Route path="/parent-dashboard/:page?">
              <ParentDashboard />
            </Route>
          </TeacherProvider>

          <TeacherProvider>
            <Route path="/teacher-dashboard/:page?">
              <TeacherDashboard />
            </Route>
          </TeacherProvider>

          <Route exact path="/parent-register">
            <ParentRegistrationApollo />
          </Route>
          <Route exact path="/teacher-register">
            <TeacherRegistrationApollo />
          </Route>
          <Route path="/student-login">
            <StudentLogin />
          </Route>
          <Route path="/teacher-login">
            <TeacherLogin />
          </Route>
          <StudentProvider>
            <Route path="/student-dashboard/:page?">
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