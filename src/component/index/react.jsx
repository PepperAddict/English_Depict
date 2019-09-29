import React from 'react';
import ReactDOM from 'react-dom';
import  ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
const client = new ApolloClient({
  uri: process.env.HASURA_URL,
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_KEY,
  },
  cache,
  credentials: 'include'
});
const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      users: (_, {id }, { getCacheKey }) => getCacheKey({ id, __typename: 'User'})
    }
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <div>hello again!</div>
  </ApolloProvider>
)
ReactDOM.render(
  <App/>,
  document.getElementById('app')
);


if (module.hot) {
  module.hot.accept();
}