const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const { GraphQLJSON } = require('graphql-type-json');
const pgdb = require('../../models/lessonsDB');
const TaskType = require('../types/task');
const TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInput',
  fields: {
    task_code: {type: GraphQLNonNull(GraphQLString)},
    student_id: { type: GraphQLNonNull(GraphQLID)},
    teacher_id: {type: GraphQLNonNull(GraphQLID)},
    task_date: {type: GraphQLNonNull(GraphQLString)},
    entry: {type: GraphQLJSON}
  }
});
module.exports = {
  type: TaskType,
  description: 'This mutation sets up the task for students',
  args: {
    input: { type: new GraphQLNonNull(TaskInputType) }
  },
  resolve: async (source, { input }, { pgPool}) => {
    return pgdb(pgPool).addTask(input);
  }
};