const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean
} = require('graphql');
const vocabType = require('./vocabulary');
const { GraphQLJSON} = require('graphql-type-json');
const lessondb = require('../../models/lessonsDB');
const pgdb = require('../../models/studentDB.js');

const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => {
    const StudentType = require('./student');
    return {
      id: {type: GraphQLID},
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      created_at: {type: GraphQLNonNull(GraphQLString)},
      auto_task: {type: GraphQLString},
      verified: {type: GraphQLBoolean},
      verify_token: {type: GraphQLString},
      share: {type: GraphQLJSON},
      students: {
        type: new GraphQLList(StudentType),
        resolve: async (source, input, { pgPool, req }) => {
          return pgdb(pgPool).getStudent(source.id);
        }
      }, 
      vocabularies: {
        type: new GraphQLList(vocabType),
        resolve: async (source, input, {pgPool, req}) => {
          return lessondb(pgPool).getVocabularyByParent(source.id)
        }
      }
    };
  }
});
module.exports = UsersType;