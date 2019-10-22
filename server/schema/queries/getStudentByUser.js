const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
const StudentType = require('../types/student')
const pgdb = require('../../models/studentDB')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(StudentType)),
  description: 'This query will sign the student in the first time',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    second_password: {type: GraphQLString}
  },
  resolve (source, {username, second_password}, { pgPool, req }) {
    return pgdb(pgPool).loginStudent(username, second_password)
  }
}