const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql')
const { verifyJwt } = require('../../utils')
const pgdb = require('../../models/pgdb')
const UsersType = new GraphQLObjectType({
  name: 'Users',
  fields: () => {
    const StudentType = require('./student')
    return {
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      date_created: {type: GraphQLNonNull(GraphQLString)},
      students: {
        type: new GraphQLList(StudentType),
        resolve: async (source, input, { pgPool, req }) => {
          try {
            // await verifyJwt(req)
            return pgdb(pgPool).getStudent(source.id)
          } catch (err) {
            return []
          }
        }
      }
    }
  }
})
module.exports = UsersType