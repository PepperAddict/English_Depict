const { GraphQLID, GraphQLNonNull } = require('graphql')
const UserType = require('../types/users')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: UserType,
  description: 'This query will search for a user with userId',
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve (obj, { userId }, { pgPool, req }) {
    return pgdb(pgPool).getUserById(userId)
  }
}