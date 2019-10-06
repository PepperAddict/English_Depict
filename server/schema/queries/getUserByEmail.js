const { GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql')
const UserType = require('../types/users')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: UserType,
  description: 'This query will search for a user with email address',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (obj, { email }, { pgPool, req }) {
    return pgdb(pgPool).getUserByEmail(email)
  }
}