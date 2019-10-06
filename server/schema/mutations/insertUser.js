const graphql = require('graphql')
const models = require('../../models')
const MeType = require('../types/me')


const UserInputType = new graphql.GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    userEmail: { type: graphql.GraphQLNonNull(graphql.GraphQLString) },
    userName: { type: graphql.GraphQLNonNull(graphql.GraphQLString) }
  }
})
module.exports = {
  type: MeType,
  description: 'This mutation will create a new user and it will return an apiKey',
  args: {
    input: { type: new graphql.GraphQLNonNull(UserInputType) }
  },
  resolve() {
    resolve: async (obj, { input }, { pgPool }) => {
      return models(pgPool).addNewUser(input)
    }
    
  } 
}