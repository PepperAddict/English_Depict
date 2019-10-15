const { GraphQLID, GraphQLNonNull, GraphQLString } = require('graphql')
const UserType = require('../types/me')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: UserType,
  description: 'This query will search for a user with userId',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: async (obj, { email, password }, { pgPool, req }) => {
    return pgdb(pgPool).login(email, password)
  }
}