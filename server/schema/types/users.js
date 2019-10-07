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
    const PostType = require('./posts')
    return {
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      date_created: {type: GraphQLNonNull(GraphQLString)},
      posts: {
        type: new GraphQLList(PostType),
        resolve: async (source, input, { pgPool, req }) => {
          try {
            await verifyJwt(req)
            return pgdb(pgPool).getPosts(source.id)
          } catch (err) {
            return []
          }
        }
      }
    }
  }
})
module.exports = UsersType