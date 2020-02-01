import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import  ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, withApollo } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const client = new ApolloClient({
  uri: '/graphql',
  headers: {
    'entrySauce': 'candy',
  },
  credentials: 'include'
});

// components
import Welcome from './Front/Welcome';
import Login from './Front/Login.jsx';
import Register from './Front/Register.jsx';
import Dashboard from '../Teacher/Dashboard';
const RegWithClient = withApollo(Register);
import StudentLogin from './StudentLogin.jsx';
import StudentDashboard from './studentDashboard.jsx';


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
      </Fragment>
    </Router>
  </ApolloProvider>
);
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);


// if (module.hot) {
//   module.hot.accept();
// }