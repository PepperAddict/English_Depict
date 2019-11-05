const {
  GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean
} = require('graphql')
const pgdb = require('../../models/lessonsDB')
const StudentType = require('../types/student')
const updateStudentAvatarType = new GraphQLInputObjectType({
  name: 'updateStudentAvatar',
  fields: {
    student_id: {type: GraphQLNonNull(GraphQLID)},
    avatar: {type: GraphQLNonNull(GraphQLString)}
  }
})

module.exports = {
  type: StudentType, 
  description: 'Change Student avatar',
  args: {
    input: {type: GraphQLNonNull(updateStudentAvatarType)}
  },
  resolve: (source, {input}, {pgPool, req}) => {
    return pgdb(pgPool).updateStudentAvatar(input)
  }
}