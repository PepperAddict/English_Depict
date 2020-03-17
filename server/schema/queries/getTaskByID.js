const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql')
const TaskType = require('../types/task')
const pgdb = require('../../models/lessonsDB')
module.exports = {
  type: TaskType,
  description: 'This query needs a task_id to get its task',
  args: {
    task_id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve (source, { task_id }, { pgPool, req }) {
    return pgdb(pgPool).getTaskByID(task_id)
  }
}