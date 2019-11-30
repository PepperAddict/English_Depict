const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} = require('graphql');
const commentType = require('./comment');
const pgdb = require('../../models/lessonsDB');
const PostType = new GraphQLObjectType({
  name: 'Blog',
  fields: () => {
    return {
      blog_id: {type: GraphQLID},
      student_id: { type: GraphQLNonNull(GraphQLID)},
      subject: {type: GraphQLNonNull(GraphQLString)},
      content: { type: GraphQLNonNull(GraphQLString)},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      updated_at: {type: GraphQLString},
      comments: {
        type: new GraphQLList(commentType),
        resolve: (source, input, {pgPool, req}) => {
          let blog_id = source.blog_id;
          return pgdb(pgPool).getCommentByBlogID(blog_id)
        }
      }
    };
  }
});
module.exports = PostType;