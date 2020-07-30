const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const GetUser = require('./queries/getUser');
const GetTeacher = require('./queries/getTeacher')
const Login = require('./queries/login');
const TeacherLogin = require('./queries/loginTeacher')
const getUserByEmail = require('./queries/getUserByEmail');
const getAllUsers = require('./queries/getAllUsers');
const getCompleteUsers = require('./queries/getCompleteUsers');
const getCompletePosts = require('./queries/getCompletePosts');
const AddUser = require('./mutations/addUser');
const AddPosts = require('./mutations/addPosts');
const AddStudent = require('./mutations/addStudent');
const getAllPosts = require('./queries/getAllPosts');
const loginStudent = require('./queries/getStudentByUser');
const UpdateStudentPassword = require('./mutations/verifiedStudent');
const getStudentByID = require('./queries/getStudentByID');
const AddBlog = require('./mutations/addBlog');
const getBlogByID = require('./queries/getSingleBlog');
const getCompleteBlogs = require('./queries/getCompleteBlogs');
const AddVocabulary = require('./mutations/addVocabulary');
const getVocabulary = require('./queries/getVocabularyByID');
const UpdateStudentAvatar = require('./mutations/updateStudentAvatar');
const UpdateStudentName = require('./mutations/updateStudentName');
const RemoveVocabulary = require('./mutations/removeVocabulary');
const EditBlog = require('./mutations/editBlog');
const AddChat = require('./mutations/addChat');
const getUserByUnknown = require('./queries/getUserByUnknown')
// const WatchChat = require('./subscriptions/watchChat');
const AddComment = require('./mutations/addComment');
const UpdateMessage = require('./mutations/addMessage');
const AddTask = require('./mutations/addTask');
const RemoveUser = require('./mutations/removeUser');
const SetVerified = require('./mutations/setVerified');
const getTaskByID = require('./queries/getTaskByID');
const SubmitTask = require('./mutations/submitTask');
const getTasksByStudentID = require('./queries/getCompleteTasksByStudentId');
const CompleteTask = require('./mutations/completeTask');
const ShareStudent = require('./mutations/shareStudent');
const AddTeacher = require('./mutations/addTeacher');
const UpdateIdentifier = require('./mutations/addIdentifier');



const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    getUser: GetUser,
    GetTeacher,
    login: Login,
    loginStudent,
    getAllUsers,
    getUserByEmail,
    getAllPosts,
    getCompleteUsers,
    getCompletePosts,
    getStudentByID,
    getCompleteBlogs,
    getVocabulary,
    getBlogByID,
    getTaskByID,
    getTasksByStudentID,
    getUserByUnknown,
    TeacherLogin

  })
});
const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    AddUser,
    AddTeacher,
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
    AddTask,
    RemoveUser,
    SetVerified,
    SubmitTask,
    CompleteTask,
    ShareStudent,
    UpdateIdentifier
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});
module.exports = schema;