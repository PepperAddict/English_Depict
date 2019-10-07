const { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const UserType = require('../types/me')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(UserType)),
  description: 'This query will give you all users with a limit',
  resolve (source, { }, { pgPool, req }) {
    return pgdb(pgPool).getCompleteUsers()
  }
}