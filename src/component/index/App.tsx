import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query, withApollo } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
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



const App = () => (
  <ApolloProvider client={client}>
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
  </ApolloProvider>
);
ReactDOM.render(
  <App />,
  document.getElementById('app')
);


// if (module.hot) {
//   module.hot.accept();
// }