const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');
const pgdb = require('../../models/studentDB');
const StudentType = require('../types/student');
const PostInputType = new GraphQLInputObjectType({
  name: 'AddMessage',
  fields: {
    student_id: { type: GraphQLNonNull(GraphQLID) },
    message: {type: GraphQLNonNull(GraphQLString)},
  }
});
module.exports = {
  type: StudentType,
  description: 'This mutation is to add a personal message to the student',
  args: {
    input: { type: new GraphQLNonNull(PostInputType) }
  },
  resolve: async (source, { input }, { pgPool }) => {
    return pgdb(pgPool).updateMessage(input);
  }
};