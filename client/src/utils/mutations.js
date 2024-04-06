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
mutation addTask($task: String!, $dueDate: String, $dueTime: String) {
  addTask(task: $task, dueDate: $dueDate, dueTime: $dueTime) {
    _id
    task
    dueDate
    dueTime
    user {
      _id
    }
  }
}`;

export const DELETE_TASK = gql`
mutation DeleteTask($taskId: ID!) {
  deleteTask(taskId: $taskId) {
    _id
  }
}
`;

export const UPDATE_TASK = gql`
mutation UpdateTask($taskId: ID!, $task: String, $dueDate: String, $dueTime: String) {
  updateTask(taskId: $taskId, task: $task, dueDate: $dueDate, dueTime: $dueTime) {
    _id
    task
    dueDate
    dueTime
  }
}
`;