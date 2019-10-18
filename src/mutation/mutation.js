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