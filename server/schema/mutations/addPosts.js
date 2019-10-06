const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const { verifyJwt } = require('../../utils')
const pgdb = require('../../models/pgdb')
const UsersType = require('../types/users')
const PostInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: {
    userId: { type: GraphQLNonNull(GraphQLID) },
    content: { type: GraphQLNonNull(GraphQLString) }
  }
})
module.exports = {
  type: UsersType,
  description: 'This mutation will add a new post',
  args: {
    input: { type: new GraphQLNonNull(PostInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    await verifyJwt(req)
    await pgdb(pgPool).addNewPost(input)
    return pgdb(pgPool).getUserById(input.userId)
  }
}