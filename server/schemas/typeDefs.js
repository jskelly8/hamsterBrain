const { gql } = require('@apollo/server');

const typeDefs = `
type Profile {
    _id: ID
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
}`;

module.exports = typeDefs;

