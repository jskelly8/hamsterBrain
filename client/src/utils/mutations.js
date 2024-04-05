import { gql } from '@apollo/client';

// Define the mutation for adding a new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Define the mutation for user login
export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      email
      password
    }
    token
  }
}
`;
