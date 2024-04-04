const { gql } = require('@apollo/server');

const typeDefs =`
type User {
    _id: ID!
    username: String!
    name: String!
    email: String!
    buddyemail: String
    password: String!
}
input EditUserInput{
    id: ID!
    username: String
    name: String
    email: String
    buddyemail: String
    password: String
}
input AddTaskInput {
    task: String!
}
type Auth {
    token: ID!
    user: User
  }
type Task {
    _id: ID!
    taskId: String!
    task: String!
    user: User!
}
type Query {
    Users: [User]!
    User(UserId: ID!): User
    me: User
    tasks: [Task]!
}

type User {
    id: ID!
    username: String!
    email: String!
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    add(name:String!): User
    editUser(input: EditUserInput!): User!
    login(email: String!, password: String!): Auth
    addTask(input: AddTaskInput!): Task!
    getTask(in)
}`;

module.exports = typeDefs;

