import { gql } from '@apollo/client';

// Define the mutation for adding a new user
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
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


export const ADD_TASK = gql`
mutation addTask($task: String!, $dueDate: String) {
  addTask(task: $task, dueDate: $dueDate) {
    _id
    dueDate
    dueTime
    task
    user {
      _id
    }
  }
}`