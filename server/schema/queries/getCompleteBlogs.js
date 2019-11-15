const { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const BlogType = require('../types/blog')
const pgdb = require('../../models/lessonsDB')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(BlogType)),
  description: 'This query will find all blogs',
  args: {
    teacher_id: {type: GraphQLNonNull(GraphQLID)},
    limit: {type: GraphQLInt},
  },
  resolve (source, { teacher_id, limit }, { pgPool, req }) {
    return pgdb(pgPool).getAllBlogs(teacher_id, limit)
  }
}