const {
    GraphQLID,
    GraphQLNonNull
  } = require('graphql')
  const TeacherIDType = require('../types/teacher_id')
  module.exports = {
    type: TeacherIDType,
    description: 'This mutation will set the Teacher ID',
    args: {
      teacher_id: {type: GraphQLNonNull(GraphQLID)}
    }
  }