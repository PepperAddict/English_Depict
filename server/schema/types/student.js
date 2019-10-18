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
      question: {type: GraphQLNonNull(GraphQLString)},
      password: {type: GraphQLNonNull(GraphQLString)},
      theme: {type: GraphQLString},
      date_created: {type: GraphQLNonNull(GraphQLString)},
      student_key: { type: GraphQLNonNull(GraphQLString)}
    }
  }
})
module.exports = StudentType