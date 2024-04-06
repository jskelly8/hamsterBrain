const { gql } = require('@apollo/server');

const typeDefs = `
  type User {
    _id: ID
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

  type Auth {
    token: ID!
    user: User
  }

  input SignUpInput {
    username: String
    email: String
    password: String
  }

  type Query {
    tasks: [Tasks]
    users: [User]
    user(username: String!): User
    me: User
   }


   type Mutation {
    addUser(username: String!, email: String!, password: String): Auth
    login(email: String!, password: String!): Auth
    addTask(task: String!, dueDate: String, dueTime: String): Tasks
    deleteTask(taskId: ID!): Tasks
    updateTask(taskId: ID!, task: String, dueDate: String, dueTime: String): Tasks
  }
`;

module.exports = typeDefs;