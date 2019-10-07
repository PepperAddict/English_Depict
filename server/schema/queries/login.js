const { GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql')
const UserType = require('../types/users')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: UserType,
  description: 'This query will search for a user with userId',
  args: {
    input: { type: new GraphQLNonNull(GraphQLID) },
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve (obj, { input, password }, { pgPool, req }) {
    return pgdb(pgPool).login(input, password)
  }
}