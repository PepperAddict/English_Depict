const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql')
const UserType = require('../types/me')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: new GraphQLList(UserType),
  description: 'This will search for user',
  args: {
    search: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (obj, { search }, { pgPool, req }) {
    return pgdb(pgPool).getUserByUnknown(search)
  }
}