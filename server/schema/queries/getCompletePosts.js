const { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const PostsType = require('../types/posts')
const pgdb = require('../../models/pgdb')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(PostsType)),
  description: 'This query will find all posts',
  resolve (source, { }, { pgPool, req }) {
    return pgdb(pgPool).getAllPosts()
  }
}