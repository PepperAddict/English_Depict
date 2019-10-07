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
    name: { type: GraphQLNonNull(GraphQLID) },
    secret1: { type: GraphQLNonNull(GraphQLString) },
    secret2: {type: GraphQLNonNull(GraphQLString)}
  }
})
module.exports = {
  type: StudentType,
  description: 'This mutation will add a new post',
  args: {
    input: { type: new GraphQLNonNull(StudentInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    await verifyJwt(req)
    await pgdb(pgPool).addNewStudent(input, source)
    return pgdb(pgPool).getUserById(input.userId)
  }
}