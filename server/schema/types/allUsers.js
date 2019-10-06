const {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql');
const {getUsers} = require('../../models/pgdb')
const users = require('./me')
const FlexibleType = new GraphQLObjectType({
  name: 'allUsers',
  fields: () => {
    return {
      users: {type: new GraphQLList(users)}
    }
  },
  resolve: async (source, { id }) => {
    const result = await getUsers();
  }
})
module.exports = FlexibleType