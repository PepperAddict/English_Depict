const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql')
const TaskType = require('../types/task')
const pgdb = require('../../models/lessonsDB')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(TaskType)),
  description: 'This query will find all tasks for a student by their id',
  args: {
      student_id: {type: GraphQLNonNull(GraphQLID)}
  },
  resolve (source, {student_id}, { pgPool, req }) {
    return pgdb(pgPool).getAllTasks(student_id)
  }
}