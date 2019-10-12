import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks';

export const Match_Email= gql`
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