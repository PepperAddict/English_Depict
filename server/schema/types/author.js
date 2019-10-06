const graphql = require('graphql');

const authorType = new graphql.GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: graphql.GraphQLString
    },
    age: {
      type: graphql.GraphQLInt
    }
  }
})

module.exports = authorType;