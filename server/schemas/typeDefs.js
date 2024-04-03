const { gql } = require('@apollo/server');

const typeDefs =`
type Profile {
    _id: ID!
    username: String!
    name: String!
    email: String!
    buddyemail: String
    password: String!
}
input EditProfileInput{
    id: ID!
    username: String
    name: String
    email: String
    buddyemail: String
    password: String
}
input AddTaskInput {
    _id: ID!
    task: String!
}
input GetTaskInput {
    _id: String!
}
type Auth {
    token: ID!
    user: User
  }
type Task {
    _id: ID!
    task: String!
    user: Profile!
}
type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    tasks: [Task]!
}

type User {
    id: ID!
    username: String!
    email: String!
}

type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    add(name:String!): Profile
    editProfile(input: EditProfileInput!): Profile!
    login(email: String!, password: String!): Auth
    addTask(input: AddTaskInput!): Task!
    getTask(input: GetTaskInput!): Task!
}`;

module.exports = typeDefs;

