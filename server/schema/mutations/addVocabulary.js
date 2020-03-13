const {
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const pgdb = require('../../models/lessonsDB')
const VocabularyType = require('../types/vocabulary')
const PostInputType = new GraphQLInputObjectType({
  name: 'VocabularyInput',
  fields: {
    student_id: { type: GraphQLNonNull(GraphQLID) },
    teacher_id: {type: GraphQLNonNull(GraphQLID)},
    vocabulary_word: {type: GraphQLNonNull(GraphQLString)},
    vocabulary_definition: { type: GraphQLString }
  }
})
module.exports = {
  type: VocabularyType,
  description: 'This mutation will add a new vocabulary word',
  args: {
    input: { type: new GraphQLNonNull(PostInputType) }
  },
  resolve: async (source, { input }, { pgPool, req }) => {
    return pgdb(pgPool).addVocabulary(input)
  }
}