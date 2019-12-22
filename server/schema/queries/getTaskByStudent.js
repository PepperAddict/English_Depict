const {GraphQLID, GraphQLNonNull} = require('graphql')
const TaskType = require('../types/task')
const pgdb = require('../../models/lessonsDB')

module.exports = {
    type: TaskType, 
    description: 'This Query pulls tasks for student',
    args: {
        student_id: {type: new GraphQLNonNull(GraphQLID)}
    },
    resolve (obj, {student_id}, {pgPool, req}) {
        return pgdb(pgPool).getTasks(student_id)
    }
}