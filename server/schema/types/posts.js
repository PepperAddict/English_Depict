const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const PostType = new GraphQLObjectType({
  name: 'Posts',
  fields: () => {
    return {
      student_id: { type: GraphQLNonNull(GraphQLID)},
      teacher_id: {type: GraphQLNonNull(GraphQLID)},
      subject: {type: GraphQLString},
      content: { type: GraphQLNonNull(GraphQLString)}
    }
  }
})
module.exports = PostType