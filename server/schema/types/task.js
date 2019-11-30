const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} = require('graphql');
const { GraphQLJSON} = require('graphql-type-json');

const taskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => {
    return {
      task_id: {type: GraphQLID},
      task_date: {type: GraphQLNonNull(GraphQLString)},
      task_code: {type: GraphQLNonNull(GraphQLString)},
      student_id: { type: GraphQLNonNull(GraphQLID)},
      teacher_id: {type: GraphQLNonNull(GraphQLID)},
      entry: { type: GraphQLJSON},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      updated: {type: GraphQLString},
      started_at: {type: GraphQLString},
      completed_at: {type: GraphQLString},
      accepted: {type: GraphQLBoolean},
      message: {type: GraphQLString},
      viewed: {type: GraphQLBoolean},
    };
  }
});
module.exports = taskType;