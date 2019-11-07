const {
  GraphQLID,
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLNonNull
} = require('graphql')

const ChatType = new GraphQLObjectType({
  name: 'Chat',
  fields: () => {
    return {
      chat_id: {type: GraphQLID},
      student_id: {type: GraphQLID},
      teacher_id: {type: GraphQLID},
      content: {type: GraphQLNonNull(GraphQLString)},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      updated_at: {type: GraphQLString}
    }
  }
})
module.exports = ChatType