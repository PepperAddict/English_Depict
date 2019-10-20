const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
const StudentType = require('../types/student')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(StudentType)),
  description: 'This query will sign the student in the first time',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve (source, {username}, { pgPool, req }) {
    return pgdb(pgPool).loginStudent(username)
  }
}