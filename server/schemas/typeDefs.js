const { gql } = require('@apollo/server');

const typeDefs = `
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
    task: String!
}
type Task {
    _id: ID!
    taskId: String!
    task: String!
    user: Profile!
}
type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
    tasks: [Task]!
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Profile
    add(name:String!): Profile
    editProfile(input: EditProfileInput!): Profile!
    login(email: String!, password: String!): Profile
    addTask(input: AddTaskInput!): Task!
}`;

module.exports = typeDefs;

