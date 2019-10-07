const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const pgdb = require('../../models/pgdb')
const MeType = require('../types/me')
const bcrypt = require('bcrypt');
const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    email: {
      type: GraphQLNonNull(GraphQLString)
    },
    username: {
      type: GraphQLNonNull(GraphQLString)
    },
    password: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
})
module.exports = {
  type: MeType,
  description: 'This mutation will create a new user and it will return an apiKey',
  args: {
    input: {
      type: new GraphQLNonNull(UserInputType)
    }
  },
  resolve: async (source, {input}, {pgPool, req }) => {

            return pgdb(pgPool).addNewUser(input)

  }
}