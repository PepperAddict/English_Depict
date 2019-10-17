const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const { verifyJwt } = require('../../utils')
const pgdb = require('../../models/pgdb')
const StudentType = require('../types/student')
const StudentInputType = new GraphQLInputObjectType({
  name: 'StudentInput',
  fields: {
    teacher_id: {type: GraphQLNonNull(GraphQLID)},
    username: { type: GraphQLNonNull(GraphQLString) },
    name: {type: GraphQLString}, 
    question1: { type: GraphQLNonNull(GraphQLString)},
    question2: {type: GraphQLNonNull(GraphQLString)},
    question3: {type: GraphQLNonNull(GraphQLString)},
    secret1: { type: GraphQLNonNull(GraphQLString)},
    secret2: {type: GraphQLNonNull(GraphQLString)},
    secret3: {type: GraphQLNonNull(GraphQLString)},
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