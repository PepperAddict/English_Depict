const express = require("express");
const router = express.Router();
const path = require('path');
require( 'cross-fetch/polyfill');
require("dotenv").config();
const lessons = require('../utils/example-work.js');
const {graphql} = require('graphql');
const schema = require('../schema');
const Boost = require("apollo-client")
const {HttpLink} = require("apollo-link-http")

const ApolloClient = Boost.ApolloClient;
const {InMemoryCache} = require("apollo-cache-inmemory")
const fetch = require("node-fetch");
const gql = require("graphql-tag");
const getall = gql`
query getAllUsers {
  getCompleteUsers {
    email
  }
}
`

const alexaGET = gql`
query getUserByEmail($email: String!) {
  getUserByEmail(email: $email) {
    id
    students {
      student_id
      name
			identifier
      tasks {
        task_id
        entry
        accepted
    }
    }
  }
}
`

const client = new ApolloClient({
    link: new HttpLink({ uri:'http://localhost:8080/graphql', credentials: 'same-origin'}),
    cache: new InMemoryCache({
        freezeResults: true
    })
})


function queryCall (res, email, callback) {
client.query({
    query: alexaGET,
    variables: {email: email}}).then(async (data) => {
        await callback(data.data.getUserByEmail)
        
    }).catch((err) => {
        res.send(JSON.stringify({message: "Something went wrong"}))
    })
}


router.get(["/api/2/alexa/:page?"], async (req, res) => {
    const path = req.url.split('/')
    const email = path[path.length - 1]
    res.setHeader('Content-Type', 'application/json')
    await queryCall(res, email, function(data) {
        res.send(data)
    })
    
});

router.get("/api/1/alexa/", function(req, res) {
 res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(lessons))   
})


module.exports = router;
