const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => {
    return {
      comment_id: {type: GraphQLID},
      blog_id: {type: GraphQLNonNull(GraphQLID)},
      teacher_id: {type: GraphQLID},
      student_id: { type: GraphQLID},
      content: { type: GraphQLNonNull(GraphQLString)},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      updated_at: {type: GraphQLString},
    }
  }
})
module.exports = CommentType