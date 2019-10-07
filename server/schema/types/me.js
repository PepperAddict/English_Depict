const { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLScalarType
} = require('graphql')
const MeType = new GraphQLObjectType({
  name: 'Me',
  fields: () => {
    return {
      id: { type: GraphQLNonNull(GraphQLID) },
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      password: {type: GraphQLNonNull(GraphQLString)},
      date_created: {type: GraphQLNonNull(GraphQLString)},
      role: {type: GraphQLString },
      apiKey: { type: GraphQLNonNull(GraphQLString) }
    }
  }
})
module.exports = MeType