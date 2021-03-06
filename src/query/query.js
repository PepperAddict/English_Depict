import gql from "graphql-tag";

export const TEACHER_ID = gql`
  query {
    getTeacherID @client {
      teacher_id @client
    }
  }
`;

export const Match_Email = gql`
  query GET_EMAILS($email: String!) {
    getUserByEmail(email: $email) {
      username
      email
    }
  }
`;

export const Get_All_Emails = gql`
  query getAllUsers {
    getCompleteUsers {
      email
    }
  }
`;

export const Handle_Login = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      apiKey
      username
    }
  }
`;

export const Handle_Teacher_Login = gql`
  query TeacherLogin($email: String!, $password: String!) {
    TeacherLogin(email: $email, password: $password) {
      teacher_id
      email
      apiKey
      username
    }
  }
`;


export const getTaskByID = gql`
  query getTaskIDByID($task_id: ID!) {
    getTaskByID(task_id: $task_id) {
      task_id
      task_date
      task_code
      student_id
      teacher_id
      entry
      viewed
      message
      accepted
      started_at
      updated
      created_at
      completed_at
      submission
    }
  }
`;
export const getAllTasksByStudentID = gql`
  query getTasksByStudentID($student_id: ID!) {
    getTasksByStudentID(student_id: $student_id) {
      task_id
      task_code
      entry
      completed_at
      accepted
    }
  }
`;

export const getUserByID = gql`
  query getUserByID($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      created_at
      verified
      share
      auto_task
      students {
        student_id
        name
        identifier
        username
        question
        password
        created_at
        theme
        avatar
        tasks {
          task_id
          task_code
          task_date
          student_id
          entry
          completed_at
          viewed
          accepted
          submission
        }
      }
      vocabularies {
        vocab_id
        vocabulary_word
        vocabulary_definition
      }
    }
  }
`;

export const getTeacherByID = gql`
query getTeacherByID($teacher_id: ID!) {
  GetTeacher(teacher_id: $teacher_id) {
    teacher_id
    email
    username
    created_at
    verified
    share
    students {
      student_id
      name
      identifier
      username
      question
      password
      created_at
      theme
      avatar
      tasks {
        task_id
        task_code
        task_date
        student_id
        entry
        completed_at
        viewed
        accepted
        submission
      }
    }
    vocabularies {
      vocab_id
      vocabulary_word
      vocabulary_definition
    }
  }
}
`


export const getUserByIDSimple = gql`
  query getUserByID($userId: ID!) {
    getUser(userId: $userId) {
      username
    }
  }
`;

export const LoginStudent = gql`
  query loginStudent($username: String!) {
    loginStudent(username: $username) {
      student_id
      verified
      username
      question
      password
      second_password
      student_key
    }
  }
`;

export const getStudentInfoSimple = gql`
  query getStudentByID($student_id: ID!) {
    getStudentByID(student_id: $student_id) {
      username
      teacher_id
      avatar
      name

    }
  }
`;

export const getStudentInfo = gql`
  query getStudentByID($student_id: ID!) {
    getStudentByID(student_id: $student_id) {
      username
      teacher_id
      parent_id
      avatar
      identifier
      student_id
      name
      grade
      message
      auto_task
      vocabularies {
        vocab_id
        vocabulary_word
      }
      tasks {
        task_id
        task_code
        task_date
        entry
        updated
        started_at
        completed_at
        accepted
        message
        viewed
        submission
      }

    }
  }
`;

export const getAllBlogs = gql`
  query getAllBlogs($limit: Int) {
    getCompleteBlogs(limit: $limit) {
      blog_id
      student_id
      subject
      created_at
      content
    }
  }
`;

export const getVocabularyByID = gql`
  query getVocabulary($student_id: ID!) {
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
  query getBlogByID($blog_id: ID!) {
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

export const getBasicByEmail = gql`
query getUserByUnknown($search: String!) {
  getUserByUnknown(search: $search) {
    id
    email
    username
  }
}
`