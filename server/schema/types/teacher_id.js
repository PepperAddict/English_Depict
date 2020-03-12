const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLList
  } = require('graphql');

  const TeacherID = new GraphQLObjectType({
    name: 'TeacherID',
    fields: () => {
      return {
        id: {type: GraphQLID},
        teacher_id: { type: GraphQLNonNull(GraphQLID)},
      };
    }
  });
  module.exports = TeacherID;