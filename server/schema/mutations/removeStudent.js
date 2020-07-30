const {
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
  } = require("graphql");
  const pgdb = require("../../models/pgdb");
  const StudentType = require("../types/student");
  
  module.exports = {
    type: StudentType,
    description: "This mutation will remove a student",
    args: {
      student_id: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (source, { student_id }, { pgPool, req }) => {
      return pgdb(pgPool).removeStudent(student_id);
    }
  };
  