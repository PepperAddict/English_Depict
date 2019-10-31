const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const pgdb = require('../../models/lessonsDB')
const BlogType = require('../types/blog')
const PostInputType = new GraphQLInputObjectType({
  name: 'BlogInput',
  fields: {
    student_id: { type: GraphQLNonNull(GraphQLID) },
    subject: {type: GraphQLNonNull(GraphQLString)},
    content: { type: GraphQLNonNull(GraphQLString) }
  }
})
module.exports = {
  type: BlogType,
  description: 'This mutation will add a new blog',
  args: {
    input: { type: new GraphQLNonNull(PostInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    return pgdb(pgPool).addBlog(input)
  }
}