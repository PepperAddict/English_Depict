const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const PostType = new GraphQLObjectType({
  name: 'Blog',
  fields: () => {
    return {
      student_id: { type: GraphQLNonNull(GraphQLID)},
      subject: {type: GraphQLNonNull(GraphQLString)},
      content: { type: GraphQLNonNull(GraphQLString)},
      created_at: {type: GraphQLNonNull(GraphQLString)}
    }
  }
})
module.exports = PostType