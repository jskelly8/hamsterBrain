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
}
type Mutation {
    add(name:String!): Profile
    editProfile(input: EditProfileInput!): Profile!
}`;

module.exports = typeDefs;

