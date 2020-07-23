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
    uri: 'https://talkingcloud.io/api/2/graphql',
    credentials: "omit"
  }),
  cache: new InMemoryCache(),
  
  
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
import Privacy from './PrivacyPolicy';
import Terms from './Terms'
import { ProgressPlugin } from 'webpack';


function App() {

  return (
    <ApolloProvider client={client}>
      <Router> 

      <WelcomeNav />

        <Fragment>

          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
          <Route exact path="/terms">
            <Terms />
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