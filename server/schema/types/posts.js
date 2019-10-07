const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const PostType = new GraphQLObjectType({
  name: 'Posts',
  fields: () => {
    return {
      user_id: { type: GraphQLNonNull(GraphQLID)},
      content: { type: GraphQLNonNull(GraphQLString) }
    }
  }
})
module.exports = PostType