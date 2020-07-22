const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
  } = require("graphql");
  const pgdb = require("../../models/studentDB");
  const StudentType = require("../types/student");
  
  module.exports = {
    type: StudentType,
    description: "This mutation will remove a student",
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (source, { id }, { pgPool, req }) => {
      return pgdb(pgPool).removeUser(id);
    }
  };
  