const { gql } = require('@apollo/server');

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    avatarColor: String
    password: String
    posts: [Post]
  }

  input SignUpInput {
    username: String
    email: String
    password: String
  }

  type Tasks {
    _id: ID
    task: String
    user: User
    dueDate: String
    dueTime: String
  }

  type Post {
    _id: ID
    title: String
    content: String
    author: User
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    user: User
    text: String
    createdAt: String  
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    tasks: [Tasks]
    users: [User]
    user(username: String!): User
    me: User
    posts: [Post]
    post(_id: ID!): Post
   }


   type Mutation {
    addUser(username: String!, email: String!, password: String): Auth
    login(email: String!, password: String!): Auth
    addTask(task: String!, dueDate: String, dueTime: String): Tasks
    deleteTask(taskId: ID!): Tasks
    updateTask(taskId: ID!, task: String, dueDate: String, dueTime: String): Tasks

    addPost(title: String!, content: String!): Post

    updateUser(username: String, email: String, avatarColor: String): User

  }
`;

module.exports = typeDefs;