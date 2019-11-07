const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');
const pgdb = require('../../models/pgdb')
const ChatType = require('../types/chat')
const ChatInputType = new GraphQLInputObjectType({
  name: 'ChatInput',
  fields: {
    student_id: {type: GraphQLID},
    teacher_id: {type: GraphQLID},
    content: {type: GraphQLNonNull(GraphQLString)}
  }
})
module.exports = {
  type: ChatType, 
  description: 'This mutation is to add to chat',
  args: {
    input: {type: new GraphQLNonNull(ChatInputType)}
  },
  resolve: (source, {input}, {pgPool, req}) => {
    return pgdb(pgPool).addChat(input)
  }
}