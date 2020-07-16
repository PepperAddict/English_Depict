const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const { verifyJwt } = require('../../utils')
const pgdb = require('../../models/studentDB')
const StudentType = require('../types/student')
const StudentInputType = new GraphQLInputObjectType({
  name: 'StudentInput',
  fields: {
    teacher_id: {type: GraphQLNonNull(GraphQLID)},
    username: { type: GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString}, 
    identifier: {type: GraphQLString},
    question: { type: GraphQLNonNull(GraphQLString)},
    password: {type: GraphQLNonNull(GraphQLString)},
    theme: {type: GraphQLString}
  }
})
module.exports = {
  type: StudentType,
  description: 'This mutation will add a new student',
  args: {
    input: { type: new GraphQLNonNull(StudentInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    return pgdb(pgPool).addNewStudent(input)

  }
}