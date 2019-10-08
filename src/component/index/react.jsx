import React from 'react';
import ReactDOM from 'react-dom';
import  ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  // headers: {
  //   'x-hasura-admin-secret': 'candy',
  // },
  // credentials: 'include'
});

// components
import Welcome from './Welcome.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';



const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </div>
    </Router>
    
    
  </ApolloProvider>
)
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);


if (module.hot) {
  module.hot.accept();
}