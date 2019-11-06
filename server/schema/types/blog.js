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
      blog_id: {type: GraphQLID},
      student_id: { type: GraphQLNonNull(GraphQLID)},
      subject: {type: GraphQLNonNull(GraphQLString)},
      content: { type: GraphQLNonNull(GraphQLString)},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      updated_at: {type: GraphQLString}
    }
  }
})
module.exports = PostType