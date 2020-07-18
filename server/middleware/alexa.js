const express = require("express");
const router = express.Router();
const path = require('path');
require( 'cross-fetch/polyfill');
require("dotenv").config();
const lessons = require('../utils/example-work.js');
const Boost = require("apollo-client")
const {HttpLink} = require("apollo-link-http")

const ApolloClient = Boost.ApolloClient;
const {InMemoryCache} = require("apollo-cache-inmemory")

const gql = require("graphql-tag");


const alexaGET = gql`
query getUserByEmail($email: String!) {
  getUserByEmail(email: $email) {
    id
    students {
      student_id
      name
      message
			identifier
      tasks {
        task_id
        task_code
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
      if (data) {
        let oby = {}
        
        for (let student of data.data.getUserByEmail.students) {
          let forTask = new Array()
          oby[student.identifier] = {
            name: student.name,
            message: student.message,
            tasks: forTask
          }
          
          for (let indi of student.tasks) {
            if (indi.task_code === "WOTD" && indi.accepted !== true) {
              const newObject = {
                task_id: indi.task_id,
                word: indi.entry.word,
                sentence: indi.entry.sentence,
                accepted: indi.accepted
              }
              forTask.push(newObject)
            }
          }
        }

        await callback(JSON.stringify(oby))
      }

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
