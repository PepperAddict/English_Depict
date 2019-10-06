const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const GetUser = require('./queries/getUser');
const GetUserByEmail = require('./queries/getUserByEmail')
const GetAllUsers = require('./queries/getAllUsers')
const AddNewUserMutation = require('./mutations/addUser')
const AddPostsMutation = require('./mutations/addPosts')
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    getUser: GetUser,
    getAllUsers: GetAllUsers,
    getUserByEmail: GetUserByEmail
  })
})
const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    AddUser: AddNewUserMutation,
    AddPosts: AddPostsMutation
  })
})
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})
module.exports = schema