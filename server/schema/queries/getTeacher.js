const { GraphQLID, GraphQLNonNull } = require('graphql')
const TeacherType = require('../types/teacher')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: TeacherType,
  description: 'This query will search for a teacher with teacher_id',
  args: {
    teacher_id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve (obj, { teacher_id }, { pgPool, req }) {
    return pgdb(pgPool).getTeacherById(teacher_id)
  }
}