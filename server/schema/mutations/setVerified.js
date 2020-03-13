const {
    GraphQLString,
    GraphQLNonNull,
  } = require('graphql');
  const pgdb = require('../../models/pgdb');
  const MeType = require('../types/me');
  module.exports = {
    type: MeType,
    description: 'This mutation will set the user with this email as verified',
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: async (source, {email}, {pgPool, req}) => {
      return pgdb(pgPool).setVerified(email);
    }
  };