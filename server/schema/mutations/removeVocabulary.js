const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const pgdb = require('../../models/lessonsDB')
const VocabularyType = require('../types/vocabulary')

module.exports = {
  type: VocabularyType,
  description: 'This mutation will remove a vocabulary word',
  args: {
    vocab_id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: async (source, { vocab_id }, { pgPool, req }) => {
    return pgdb(pgPool).removeVocabulary(vocab_id)
  }
}