const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const pgdb = require('../../models/lessonsDB')
const BlogType = require('../types/blog')
const PostInputType = new GraphQLInputObjectType({
  name: 'BlogEdit',
  fields: {
    blog_id: {type: GraphQLNonNull(GraphQLID)},
    subject: {type: GraphQLNonNull(GraphQLString)},
    content: { type: GraphQLNonNull(GraphQLString) },
    updated_at: {type: GraphQLNonNull(GraphQLString)}
  }
})
module.exports = {
  type: BlogType,
  description: 'This mutation will edit a blog',
  args: {
    input: { type: new GraphQLNonNull(PostInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    return pgdb(pgPool).editBlog(input)
  }
}