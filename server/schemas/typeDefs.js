const { gql } = require('@apollo/server');

const typeDefs = `
type Query {
    hello: String
  
}`;

module.exports = typeDefs;

