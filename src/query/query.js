import gql from 'graphql-tag';
import {
  useQuery,
  useMutation
} from '@apollo/react-hooks';

export const Match_Email = gql`
query GET_EMAILS ($email: String!) {
  getUserByEmail(email: $email) {
    username
    email
  }
}`

export const Get_All_Emails = gql`
query getAllUsers {
  getCompleteUsers {
    email
  }
}
`

export const Handle_Login = gql`
query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    apiKey
  }
}
`

export const getUserByID = gql`
query getUserByID($userId: ID!) {
  getUser(userId: $userId) {
    username
    date_created
    students {
      username
      question
      password
      date_created
      theme
    }
  }
}
`