const {
  GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLBoolean
} = require('graphql')
const pgdb = require('../../models/lessonsDB')
const StudentType = require('../types/student')
const updateStudentName = new GraphQLInputObjectType({
  name: 'updateStudentName',
  fields: {
    student_id: {type: GraphQLNonNull(GraphQLID)},
    name: {type: GraphQLNonNull(GraphQLString)}
  }
})

module.exports = {
  type: StudentType, 
  description: 'Change Student name',
  args: {
    input: {type: GraphQLNonNull(updateStudentName)}
  },
  resolve: (source, {input}, {pgPool, req}) => {
    return pgdb(pgPool).updateStudentName(input)
  }
}