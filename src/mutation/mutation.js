import gql from 'graphql-tag';

export const ADD_REGISTRATION = gql`
mutation AddNewUser($input: UserInput!) {
  AddUser(input: $input) { 
    id
    email
    username
    apiKey
  }
}`

export const ADD_STUDENT = gql`
mutation AddStudent($input: StudentInput!) {
  AddStudent (input: $input) {
    name
		student_key
    username
    teacher_id
    question
    password
    date_created
  }
}
`

export const ADD_NEWPW = gql`
mutation studentNewPassword($input: UpdateStudentPassword!) {
  UpdateStudentPassword(input: $input) {
    second_password
    student_id
    student_key
    teacher_id
  }
}
`

export const ADD_BLOG = gql`
mutation AddBlog($input: BlogInput!){
  AddBlog (input: $input) {
    student_id
    created_at
    subject
    content
  }
}
`

export const EDIT_BLOG = gql`
mutation editBlog($input: BlogEdit!){
  EditBlog(input: $input) {
    blog_id
    subject
    content
    updated_at
  }
}
`

export const ADD_VOCABULARY = gql`
mutation AddVocabulary($input: VocabularyInput!){
  AddVocabulary(input: $input) {
    student_id
    vocabulary_word
    vocabulary_definition
  }
}
`

export const UPDATE_STUDENT_AVATAR = gql`
mutation updateStudentAvatar($input: updateStudentAvatar!) {
  UpdateStudentAvatar(input: $input) {
    student_id
    student_key
    avatar
  }
}
`

export const REMOVE_VOCABULARY = gql`
  mutation removeVocabulary($vocab_id: ID!){
  RemoveVocabulary(vocab_id: $vocab_id) {
    vocab_id
  } 
}
`