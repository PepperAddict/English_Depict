const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const GetUser = require('./queries/getUser');
const Login = require('./queries/login');
const GetUserByEmail = require('./queries/getUserByEmail');
const GetAllUsers = require('./queries/getAllUsers');
const GetCompleteUsers = require('./queries/getCompleteUsers');
const GetCompletePosts = require('./queries/getCompletePosts');
const AddUser = require('./mutations/addUser');
const AddPosts = require('./mutations/addPosts');
const AddStudent = require('./mutations/addStudent');
const GetAllPosts = require('./queries/getAllPosts');
const loginStudent = require('./queries/getStudentByUser');
const UpdateStudentPassword = require('./mutations/verifiedStudent');
const GetStudentByID = require('./queries/getStudentByID');
const AddBlog = require('./mutations/addBlog');
const GetBlogByID = require('./queries/getSingleBlog');
const GetCompleteBlogs = require('./queries/getCompleteBlogs');
const AddVocabulary = require('./mutations/addVocabulary');
const GetVocabularyByStudentID = require('./queries/getVocabularyByID');
const UpdateStudentAvatar = require('./mutations/updateStudentAvatar');
const UpdateStudentName = require('./mutations/updateStudentName');
const RemoveVocabulary = require('./mutations/removeVocabulary');
const EditBlog = require('./mutations/editBlog');
const AddChat = require('./mutations/addChat');
// const WatchChat = require('./subscriptions/watchChat');
const AddComment = require('./mutations/addComment');
const UpdateMessage = require('./mutations/addMessage');
const AddTask = require('./mutations/addTask');
const GetTasks = require('./queries/getTaskByStudent');
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
    getCompleteBlogs: GetCompleteBlogs,
    getVocabulary: GetVocabularyByStudentID,
    getBlogByID: GetBlogByID,
    GetTasks
  })
});
const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    AddUser,
    AddPosts,
    AddStudent,
    UpdateStudentPassword,
    AddBlog,
    AddVocabulary,
    UpdateStudentAvatar,
    UpdateStudentName,
    RemoveVocabulary,
    EditBlog,
    AddChat,
    AddComment,
    UpdateMessage,
    AddTask
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});
module.exports = schema;