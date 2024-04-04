// const { gql } = require('@apollo/server');

// const typeDefs = `
// type User {
//     _id: ID!
//     username: String!
//     name: String!
//     email: String!
//     buddyemail: String
//     password: String!
// }
// input EditUserInput{
//     id: ID!
//     username: String
//     name: String
//     email: String
//     buddyemail: String
//     password: String
// }
// input AddTaskInput {
//     task: String!
// }
// type Auth {
//     token: ID!
//     user: User
//   }
// type Task {
//     _id: ID!
//     taskId: String!
//     task: String!
//     user: User!
// }
// type Query {
//     Users: [User]!
//     User(UserId: ID!): User
//     me: User
//     tasks: [Task]!
// }
// type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     add(name:String!): User
//     editUser(input: EditUserInput!): User!
//     login(email: String!, password: String!): Auth
//     addTask(input: AddTaskInput!): Task!
// }`;

// module.exports = typeDefs;
// type User {
//   id: ID!
//   username: String!
//   email: String!
//   password: String! # Consider using a hashed password
//   buddyemail: String
//   buddycode: String
//   me: Boolean!
// }

// type Profile {
//   user: User!
//   testimonials: String
//   bio: String
//   profileImg: String
// }

// type Task {
//   id: ID!
//   title: String!
//   description: String
//   dueDateTime: String
//   subTasks: [Task]
// }

// type Auth {
//   token: String!
//   user: User!
// }

// input AddTaskInput {
//   title: String!
//   description: String
//   dueDateTime: String
// }

// input UpdateTaskInput {
//   id: ID!
//   title: String
//   description: String
//   dueDateTime: String
// }

// input DeleteTaskInput {
//   id: ID!
// }

// type Mutation {
//   addUser(username: String!, email: String!, password: String!, buddycode: String!): Auth!
//   updateUser(id: ID!, username: String, email: String, password: String, buddyemail: String, buddycode: String, me: Boolean): User!
//   deleteUser(id: ID!): Boolean!

//   addProfile(userId: ID!, testimonials: String, bio: String, profileImg: String): Profile!
//   updateProfile(userId: ID!, testimonials: String, bio: String, profileImg: String): Profile!

//   addTask(userId: ID!, input: AddTaskInput!): Task!
//   updateTask(userId: ID!, input: UpdateTaskInput!): Task!
//   deleteTask(userId: ID!, input: DeleteTaskInput!): Boolean!

//   signIn(email: String!, password: String!): Auth!
//   signOut(userId: ID!): Boolean!

