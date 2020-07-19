const { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList
} = require('graphql');
const vocabType = require('./vocabulary');
const { GraphQLJSON} = require('graphql-type-json');
const pgdb = require('../../models/lessonsDB');
const MeType = new GraphQLObjectType({
  name: 'Me',
  fields: () => {
    return {
      id: { type: GraphQLID },
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      password: {type: GraphQLNonNull(GraphQLString)},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      share: {type: GraphQLJSON},
      role: {type: GraphQLString },
      apiKey: { type: GraphQLNonNull(GraphQLString) },
      verified: {type: GraphQLBoolean},
      verify_token: {type: GraphQLString},
      student_id: {type: GraphQLID},
      vocabularies: {
        type: new GraphQLList(vocabType),
        resolve: async (source, input, {pgPool, req}) => {
          let teacher_id = source.userId;
          console.log(teacher_id)
          return pgdb(pgPool).getVocabularyByTeacher(teacher_id)
        }
      }
    };
  }
});
module.exports = MeType;