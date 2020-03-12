const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
  } = require('graphql');

  const TeacherID = new GraphQLObjectType({
    name: 'TeacherID',
    fields: () => {
      return {
        teacher_id: { type: GraphQLNonNull(GraphQLID)},
      };
    }
  });
  module.exports = TeacherID;