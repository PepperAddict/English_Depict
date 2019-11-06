const { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const BlogType = require('../types/blog')
const pgdb = require('../../models/lessonsDB')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(BlogType)),
  description: 'This query will search for Blogs by ID',
  args: {
    blog_id: {type: GraphQLNonNull(GraphQLID)}
  },
  async resolve (source, { blog_id}, { pgPool, req }) {
    return pgdb(pgPool).getBlogByID(blog_id);

  }
}