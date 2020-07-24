const { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');
const { GraphQLJSON} = require('graphql-type-json');
const pgdb = require('../../models/lessonsDB');
const vocabType = require('./vocabulary');
const blogType = require('./blog');
const TaskType = require('./task');
const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => {
    return {
      student_id: { type: GraphQLNonNull(GraphQLID) },
      username: {type: GraphQLNonNull(GraphQLString)},
      teacher_id: {type: GraphQLID},
      parent_id: {type: GraphQLNonNull(GraphQLID)},
      name: { type: GraphQLString },
      share: {type: GraphQLJSON},
      identifier: {type: GraphQLString},
      question: {type: GraphQLNonNull(GraphQLString)},
      password: {type: GraphQLNonNull(GraphQLString)},
      theme: {type: GraphQLString},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      student_key: { type: GraphQLNonNull(GraphQLString)},
      verified: {type: GraphQLBoolean},
      second_password: {type: GraphQLString},
      avatar: {type: GraphQLString},
      message: {type: GraphQLString},
      vocabularies: {
        type: new GraphQLList(vocabType),
        resolve: async (source, input, { pgPool, req }) => {
          let student_id = source.student_id;
          return pgdb(pgPool).getVocabularyByID(student_id);
        }
      },
      blogs: {
        type: new GraphQLList(blogType),
        resolve: async (source, input, { pgPool, req }) => {
          let student_id = source.student_id;
          return pgdb(pgPool).getAllBlogs(student_id);
        }
      },
      tasks: {
        type: new GraphQLList(TaskType),
        resolve: async (source, input, {pgPool, req}) => {
          return pgdb(pgPool).getTasks(source.student_id);
        }
      }
    };
  }
});
module.exports = StudentType;