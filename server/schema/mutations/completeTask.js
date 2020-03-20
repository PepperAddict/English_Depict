const {
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLBoolean,
    GraphQLString
  } = require('graphql');
  const { GraphQLJSON } = require('graphql-type-json');
  const pgdb = require('../../models/lessonsDB');
  const TaskType = require('../types/task');

  const TaskComplete = new GraphQLInputObjectType({
    name: 'CompleteTask',
    fields: {
        task_id: {type: new GraphQLNonNull(GraphQLID)},
        accepted: {type: GraphQLBoolean},
        message: {type: GraphQLString}
    }
  })

  module.exports = {
    type: TaskType,
    description: 'This mutation is for teacher to approve or reject with a message for task',
    args: {
        input: {type: new GraphQLNonNull(TaskComplete)}
    },
    resolve: async (source, {input}, {pgPool, req}) => {
      return pgdb(pgPool).completeTask(input);
    }
  };