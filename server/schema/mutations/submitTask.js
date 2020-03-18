const {
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLID
  } = require('graphql');
  const { GraphQLJSON } = require('graphql-type-json');
  const pgdb = require('../../models/lessonsDB');
  const TaskType = require('../types/task');

  const TaskInputType = new GraphQLInputObjectType({
    name: 'TaskSubmit',
    fields: {
        task_id: {type: new GraphQLNonNull(GraphQLID)},
        submission: {type: new GraphQLNonNull(GraphQLJSON)}
    }
  })

  module.exports = {
    type: TaskType,
    description: 'This mutation is for submitting task from the student',
    args: {
        input: {type: new GraphQLNonNull(TaskInputType)}
    },
    resolve: async (source, {input}, {pgPool, req}) => {
      return pgdb(pgPool).submitTask(input);
    }
  };