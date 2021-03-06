const { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const UserType = require('../types/me')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(UserType)),
  description: 'This query will give you all users with a limit',
  args: {
    limit: { type: new GraphQLNonNull(GraphQLInt) }
  },
  resolve (source, { limit }, { pgPool, req }) {
    return pgdb(pgPool).getAllUsers(limit)
  }
}