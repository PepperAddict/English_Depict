const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql')
  
  const pgdb = require('../../models/studentDB')
  const MeType = require('../types/me')
  const { GraphQLJSON } = require('graphql-type-json');
  const StudentInputType = new GraphQLInputObjectType({
    name: 'ShareStudentInput',
    fields: {
      id: {type: GraphQLNonNull(GraphQLID)},
      share: {type: GraphQLNonNull(GraphQLJSON)},
      student_id: {type: GraphQLNonNull(GraphQLID)}
    }
  })
  module.exports = {
    type: MeType,
    description: 'This mutation will share student',
    args: {
      input: { type: new GraphQLNonNull(StudentInputType) }
    },
    resolve: async (source, { input }, { pgPool, req }) => {
      return pgdb(pgPool).shareStudent(input)
    }
  }