const { GraphQLNonNull, GraphQLString } = require('graphql')
const TeacherType = require('../types/teacher')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: TeacherType,
  description: 'This query will login the teacher by first matching their email address',
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: {type: new GraphQLNonNull(GraphQLString)}
  },
  resolve: (obj, { email, password }, { pgPool, req }) => {

       return pgdb(pgPool).loginTeacher(email, password)

  }
}