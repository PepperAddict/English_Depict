const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} = require('graphql')
const VocabularyType = new GraphQLObjectType({
  name: 'Vocabulary',
  fields: () => {
    return {
      student_id: { type: GraphQLNonNull(GraphQLID)},
      vocabulary_word: {type: GraphQLNonNull(GraphQLString)},
      vocabulary_definition: { type: GraphQLString},
      created_at: {type: GraphQLNonNull(GraphQLString)}
    }
  }
})
module.exports = VocabularyType