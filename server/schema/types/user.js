const graphql = require('graphql')
const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    user: {
      userID: { type: graphql.GraphQLID },
      userEmail: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      userName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
      token: { type: graphql.GraphQLString }
    }
  }
})
module.exports = UserType