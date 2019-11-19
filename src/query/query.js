import gql from 'graphql-tag';

export const Match_Email = gql `
query GET_EMAILS ($email: String!) {
  getUserByEmail(email: $email) {
    username
    email
  }
}`;

export const Get_All_Emails = gql `
query getAllUsers {
  getCompleteUsers {
    email
  }
}
`;

export const Handle_Login = gql `
query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    apiKey
    username
  }
}
`;

export const getUserByID = gql `
query getUserByID($userId: ID!) {
  getUser(userId: $userId) {
    email
    username
    date_created
    students {
      student_id
      name
      username
      question
      password
      date_created
      theme
      avatar
    }
  }
}
`;

export const getUserByIDSimple = gql `
query getUserByID($userId: ID!) {
  getUser(userId: $userId) {
    username
  }
}
`;


export const LoginStudent = gql `
query loginStudent($username: String!) {
  loginStudent (username: $username) {
    student_id
    verified
    username
    question
    password
    second_password
    student_key
}
}`;

export const getStudentInfoSimple = gql `
query getStudentByID($student_id: ID!){
  getStudentByID(student_id: $student_id) {
    username
    teacher_id
    avatar
    name
  }
}`;

export const getStudentInfo = gql `
query getStudentByID($student_id: ID!){
  getStudentByID(student_id: $student_id) {
    username
    teacher_id
    avatar
    student_key
    name
    vocabularies {
      vocab_id
      vocabulary_word
    }
    blogs {
      blog_id, 
      subject,
      content,
      created_at
      comments {
        student_id
        teacher_id
        content
        created_at
      }
    }
  }
}`;

export const getAllBlogs = gql `
query getAllBlogs($limit: Int) {
  getCompleteBlogs(limit: $limit) {
    blog_id
    student_id
    subject
    created_at
    content
  }
}`;

export const getVocabularyByID = gql `
query getVocabulary($student_id: ID!){
  getVocabulary(student_id: $student_id) {
    vocab_id
    student_id
    vocabulary_word
    vocabulary_definition
    created_at
  }
}
`;

export const getBlogByID = gql`
query getBlogByID($blog_id: ID!){
  getBlogByID(blog_id: $blog_id) {
    blog_id
    created_at
    subject
    content
    updated_at
    student_id
    comments {
      content 
      student_id
      teacher_id
      created_at
    }
  }
}
`;