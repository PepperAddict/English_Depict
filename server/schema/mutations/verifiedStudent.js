const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')

const pgdb = require('../../models/studentDB')
const StudentType = require('../types/student')
const StudentInputType = new GraphQLInputObjectType({
  name: 'UpdateStudentPassword',
  fields: {
    student_id: { type: GraphQLNonNull(GraphQLID)},
    second_password: {type: GraphQLNonNull(GraphQLString)},
  }
})
module.exports = {
  type: StudentType,
  description: 'This mutation will update the students password',
  args: {
    input: { type: new GraphQLNonNull(StudentInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    return pgdb(pgPool).verifyStudent(input)
  }
}