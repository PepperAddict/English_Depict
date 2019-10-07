const { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const pgdb = require('../../models/pgdb')
const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => {
    const UserType = require('./me')
    return {
      student_id: { type: GraphQLNonNull(GraphQLID) },
      teacher_id: {type: GraphQLNonNull(GraphQLID)},
      name: { type: GraphQLNonNull(GraphQLString) },
      secret1: { type: GraphQLNonNull(GraphQLString) },
      secret2: {type: GraphQLNonNull(GraphQLString)},
      date_created: {type: GraphQLNonNull(GraphQLString)},
      apiKey: { type: GraphQLNonNull(GraphQLString) }
    }
  }
})
module.exports = StudentType