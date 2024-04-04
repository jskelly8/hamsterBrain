const { gql } = require('@apollo/server');

const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    signUp(input: SignUpInput!): Auth
  }
  type Query {
    Users: [User]!
    User(UserId: ID!): User
    me: User
  
  }
`;

module.exports = typeDefs;