const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const pgdb = require('../../models/lessonsDB')
const CommentType = require('../types/comment')
const PostInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  fields: {
    blog_id: {type: GraphQLNonNull(GraphQLID)},
    student_id: { type: GraphQLID },
    teacher_id: {type: GraphQLID},
    content: {type: GraphQLNonNull(GraphQLString)},
  }
})
module.exports = {
  type: CommentType,
  description: 'This mutation will add a new comment for a blog post',
  args: {
    input: { type: new GraphQLNonNull(PostInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    return pgdb(pgPool).addComment(input)
  }
}