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
import IndividualTask from './../Student/IndividualTask';
import {vocab, listCheck} from '../../helpers/vocab';


function App() {

  const [vocabulary, setVocabulary] = useState(null);
  const [def, setDef] = useState(null);
  const [listWords, setwords] = useState(null)

  const vocabLookup = e => {
    setVocabulary(e)
    const definition = vocab(e);
    setDef(definition)
  }

  const spellCheck = e => {
    const list = listCheck(e)
    setVocabulary(e)
    setwords(list)
  }


  return (
    <ApolloProvider client={client}>
      <MyContext.Provider value={{
        vocabulary, 
        def, 
        setVocabulary: e => setVocabulary(e), 
        lookUp: e => vocabLookup(e),
        spellCheck: e => spellCheck(e),
        listWords}}>
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
            <Route path="/verify">
              <Verify />
            </Route>
            <Route path="/todo/:page?">
              <IndividualTask />
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