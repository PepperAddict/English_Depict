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
      vocab_id: {type: GraphQLID},
      student_id: { type: GraphQLNonNull(GraphQLID)},
      vocabulary_word: {type: GraphQLNonNull(GraphQLString)},
      vocabulary_definition: { type: GraphQLString},
      created_at: {type: GraphQLNonNull(GraphQLString)},
      teacher_id: {type: GraphQLID},
      parent_id: {type: GraphQLID}
    }
  }
})
module.exports = VocabularyType