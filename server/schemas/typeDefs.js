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
type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
}
type Mutation {
    addProfile(name: String!, email: String!, password: String!): Profile
    add(name:String!): Profile
    editProfile(input: EditProfileInput!): Profile!
    login(email: String!, password: String!): Profile
}`;

module.exports = typeDefs;

