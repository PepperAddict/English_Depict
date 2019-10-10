import gql from 'graphql-tag';

export const Match_Email= gql`
query GET_EMAILS ($email: String!) {
  getUserByEmail(email: $email) {
    username
    email
  }
}`
