const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLBoolean
  } = require('graphql');
  const pgdb = require('../../models/pgdb');
  const TeacherType = require('../types/teacher');
  const UserInputType = new GraphQLInputObjectType({
    name: 'TeacherInput',
    fields: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      },
      username: {
        type: GraphQLNonNull(GraphQLString)
      },
      password: {
        type: GraphQLNonNull(GraphQLString)
      },
      verify_token: {
        type: GraphQLNonNull(GraphQLString)
      }
    }
  });
  module.exports = {
    type: TeacherType,
    description: 'This mutation will create a new teacher and it will return an apiKey',
    args: {
      input: {
        type: new GraphQLNonNull(UserInputType)
      }
    },
    resolve: async (source, {
      input
    }, {
        pgPool,
        req
      }) => {

      return pgdb(pgPool).addNewTeacher(input);
    }
  };