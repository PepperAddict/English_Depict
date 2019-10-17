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

    return {
      student_id: { type: GraphQLNonNull(GraphQLID) },
      username: {type: GraphQLNonNull(GraphQLString)},
      teacher_id: {type: GraphQLNonNull(GraphQLID)},
      name: { type: GraphQLString },
      question1: {type: GraphQLNonNull(GraphQLString)},
      question2: {type: GraphQLNonNull(GraphQLString)},
      question3: {type: GraphQLNonNull(GraphQLString)},
      secret1: { type: GraphQLNonNull(GraphQLString)},
      secret2: {type: GraphQLNonNull(GraphQLString)},
      secret3: {type: GraphQLNonNull(GraphQLString)},
      date_created: {type: GraphQLNonNull(GraphQLString)},
      apiKey: { type: GraphQLNonNull(GraphQLString) }
    }
  }
})
module.exports = StudentType