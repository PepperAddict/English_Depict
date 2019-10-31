const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const GetUser = require('./queries/getUser');
const Login = require('./queries/login')
const GetUserByEmail = require('./queries/getUserByEmail')
const GetAllUsers = require('./queries/getAllUsers')
const GetCompleteUsers = require('./queries/getCompleteUsers')
const GetCompletePosts = require('./queries/getCompletePosts')
const AddNewUserMutation = require('./mutations/addUser')
const AddPostsMutation = require('./mutations/addPosts')
const AddNewStudent = require('./mutations/addStudent')
const GetAllPosts = require('./queries/getAllPosts')
const loginStudent = require('./queries/getStudentByUser')
const updatestudentpw = require('./mutations/verifiedStudent')
const GetStudentByID = require('./queries/getStudentByID')
const AddBlog = require('./mutations/addBlog')
const GetCompleteBlogs = require('./queries/getCompleteBlogs');
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    getUser: GetUser,
    login: Login,
    loginStudent: loginStudent,
    getAllUsers: GetAllUsers,
    getUserByEmail: GetUserByEmail,
    getAllPosts: GetAllPosts,
    getCompleteUsers: GetCompleteUsers,
    getCompletePosts: GetCompletePosts,
    getStudentByID: GetStudentByID,
    getCompleteBlogs: GetCompleteBlogs
  })
})
const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    AddUser: AddNewUserMutation,
    AddPosts: AddPostsMutation,
    AddStudent: AddNewStudent,
    UpdateStudentPassword: updatestudentpw,
    AddBlog: AddBlog
  })
})
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})
module.exports = schema