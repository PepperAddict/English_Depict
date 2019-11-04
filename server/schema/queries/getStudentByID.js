const { GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql')
const UserType = require('../types/student')
const pgdb = require('../../models/studentDB')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(UserType)),
  description: 'This query will search for the student by ID',
  args: {
    student_id: {type: GraphQLNonNull(GraphQLID)}
  },
  async resolve (source, { student_id}, { pgPool, req }) {
    return pgdb(pgPool).getStudentByID(student_id);

  }
}