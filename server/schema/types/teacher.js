const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const vocabType = require("./vocabulary");
const { GraphQLJSON } = require("graphql-type-json");
const pgdb = require("../../models/lessonsDB");
const studentdb = require("../../models/studentDB.js");
const TeacherType = new GraphQLObjectType({
  name: "Teachers",
  fields: () => {
    const StudentType = require("./student");
    return {
      teacher_id: { type: GraphQLID },
      email: { type: GraphQLNonNull(GraphQLString) },
      username: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
      created_at: { type: GraphQLNonNull(GraphQLString) },
      share: { type: GraphQLJSON },
      amazon: { type: GraphQLString },
      apiKey: { type: GraphQLNonNull(GraphQLString) },
      verified: { type: GraphQLBoolean },
      verify_token: { type: GraphQLString },
      students: {
        type: new GraphQLList(StudentType),
        resolve: async (source, input, { pgPool, req }) => {
          return studentdb(pgPool).getStudent(source.teacher_id);
        },
      },
      vocabularies: {
        type: new GraphQLList(vocabType),
        resolve: async (source, input, { pgPool, req }) => {
          return pgdb(pgPool).getVocabularyByTeacher(source.teacher_id);
        },
      },
    };
  },
});
module.exports = TeacherType;
