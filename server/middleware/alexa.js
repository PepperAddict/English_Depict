const express = require("express");
const router = express.Router();
const path = require("path");
require("cross-fetch/polyfill");
require("dotenv").config();
const lessons = require("../utils/example-work.js");
const Boost = require("apollo-client");
const { HttpLink } = require("apollo-link-http");

const ApolloClient = Boost.ApolloClient;
const { InMemoryCache } = require("apollo-cache-inmemory");
const gql = require("graphql-tag");
const isProd = process.env.NODE_ENV === "production";
const alexaGET = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      share
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
          submission
        }
      }
    }
  }
`;
const alexaStudentTask = gql`
  query getStudentByID($student_id: ID!) {
    getStudentByID(student_id: $student_id) {
      username
      identifier
      student_id
      name
      message
      tasks {
        task_id
        task_code
        entry
        accepted
        submission
      }
    }
  }
`;

const SubmitTask = gql`
  mutation SubmitTask($input: TaskSubmit!) {
    SubmitTask(input: $input) {
      student_id
    }
  }
`;

const client = new ApolloClient({
  link: new HttpLink({
    uri: (isProd) ? 'https://talkingcloud.io/api/2/graphql' : 'http://localhost:8080/api/2/graphql'
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
async function mutationCall(res, variables, callback) {
  await client
    .mutate({ mutation: SubmitTask, variables: { input: variables } })
    .then((res) => {})
    .catch((err) => console.log(err));
}

async function queryCall(res, email, callback) {
  console.log(email)
  await client
    .query({
      query: alexaGET,
      variables: { email: email },
    })
    .then(async (data) => {
      if (data) {
        let oby = {};

        for (let student of data.data.getUserByEmail.students) {
          let forTask = new Array();
          oby[student.identifier] = {
            name: student.name,
            message: student.message,
            tasks: forTask,
          };


          for (let indi of student.tasks) {
            if (indi.task_code === "WOTD" && !indi.submission) {
              const newObject = {
                task_id: indi.task_id,
                word: indi.entry.word,
                sentence: indi.entry.sentence,
                accepted: indi.accepted,
              };
              forTask.push(newObject);
            }
          }
        }

        if (data.data.getUserByEmail.share) {
          for (let student of data.data.getUserByEmail.share.shared) {
            await client
              .query({
                query: alexaStudentTask,
                variables: { student_id: student.student_id },
              })
              .then((res) => {
                const studentInfo = res.data.getStudentByID[0];
                let forTasks = [];
                oby[studentInfo.identifier] = {
                  name: studentInfo.name,
                  message: studentInfo.message,
                  tasks: forTasks,
                };

                for (let indi of studentInfo.tasks) {
                  let newTasks = {
                    task_id: indi.task_id,
                    word: indi.entry.word,
                    sentence: indi.entry.sentence,
                    accepted: indi.accepted,
                  };
                  forTasks.push(newTasks);
                }
              });
          }
        }


        await callback(JSON.stringify(oby));
      }
    })
    .catch((err) => {
      console.log(err)
      res.send(JSON.stringify({ error: "Something went wrong" }));
    });
}

router.get(["/api/2/alexa/:page?"], async (req, res) => {

  res.setHeader("Content-Type", "application/json");
  const path = req.url.split("/");
  const email = path[path.length - 1];
  await queryCall(res, email, function (data) {
    return res.send(data);
  });
});

router.post("/api/2/alexa/update", async (req, res, next) => {
  await mutationCall(res, req.body);
  res.send({ message: "success" });
});

router.get("/api/1/alexa/", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(lessons));
});


module.exports = router;
