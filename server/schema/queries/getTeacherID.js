const { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const TeacherID = require('../types/teacher_id')
module.exports = {
  type: TeacherID,
  description: 'This query will get the teacher id'
}