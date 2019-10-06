const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql')
const PostType = new GraphQLObjectType({
  name: 'Posts',
  fields: () => {
    return {
      post: { type: GraphQLNonNull(GraphQLString) }
    }
  }
})
module.exports = PostType