const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");
const pgdb = require("../../models/pgdb");
const UserType = require("../types/me");

module.exports = {
  type: UserType,
  description: "This mutation will remove a user",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (source, { id }, { pgPool, req }) => {
    return pgdb(pgPool).removeUser(id);
  }
};
