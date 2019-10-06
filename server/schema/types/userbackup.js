const { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    return {
      userID: { type: GraphQLID },
      userEmail: { type: GraphQLNonNull(GraphQLString) },
      userName: { type: GraphQLNonNull(GraphQLString) },
      token: { type: GraphQLString }
    }
  }
})
module.exports = UserType