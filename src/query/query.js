import gql from 'graphql-tag';

export const Match_Email= gql`
query GET_EMAILS ($email: String) {
  users(where: {userEmail: {_eq: $email}}) {
    userEmail
  }
}`
