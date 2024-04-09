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
      avatarColor
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
      username
      avatarColor
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
mutation UpdateTask($taskId: ID!, $task: String, $dueDate: String, $dueTime: String, $completed: Boolean) {
  updateTask(taskId: $taskId, task: $task, dueDate: $dueDate, dueTime: $dueTime, completed: $completed) {
    _id
    task
    dueDate
    dueTime
    completed
  }
}
`;

export const ADD_POST = gql`
mutation AddPost($title: String!, $content: String!) {
  addPost(title: $title, content: $content) {
    _id
    title
    content
    author {
      _id
      username
    }
    createdAt
  }
}
`;

export const UPDATE_USER = gql`
mutation UpdateUser($username: String, $email: String, $avatarColor: String) {
  updateUser(username: $username, email: $email, avatarColor: $avatarColor) {
    _id
    email
    username
    avatarColor
  }
}
`;

export const DELETE_POST = gql`
mutation DeletePost($id: ID!) {
  deletePost(_id: $id) {
    _id
    content
    createdAt
    title
  }
}
`

export const ADD_COMMENT = gql`
mutation AddComment($postId: ID!, $text: String!) {
  addComment(postId: $postId, text: $text) {
    _id
    text
  }
}
`