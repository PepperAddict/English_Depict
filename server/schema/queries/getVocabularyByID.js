const { GraphQLID, GraphQLNonNull, GraphQLList } = require('graphql')
const VocabularyType = require('../types/vocabulary')
const pgdb = require('../../models/lessonsDB')
module.exports = {
  type: new GraphQLNonNull(new GraphQLList(VocabularyType)),
  description: 'This query will search for vocabulary words made by student',
  args: {
    student_id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve (obj, { student_id }, { pgPool, req }) {
    return pgdb(pgPool).getVocabularyByStudent(student_id)
  }
}