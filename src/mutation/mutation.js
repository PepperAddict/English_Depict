import gql from 'graphql-tag';

export const RegisterUser = gql`
mutation AddNewUser($input: UserInput!) {
  AddUser(input: $input) { 
    id
    email
    username
    apiKey
  }
}`