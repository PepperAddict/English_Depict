const { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean
} = require('graphql');
const MeType = new GraphQLObjectType({
  name: 'Me',
  fields: () => {
    return {
      id: { type: GraphQLID },
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      password: {type: GraphQLNonNull(GraphQLString)},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      role: {type: GraphQLString },
      apiKey: { type: GraphQLNonNull(GraphQLString) },
      verified: {type: GraphQLBoolean},
      verified_token: {type: GraphQLString}
    };
  }
});
module.exports = MeType;