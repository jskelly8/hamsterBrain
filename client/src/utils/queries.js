import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_TASKS = gql`
  query getTasks {
    tasks {
      _id
      task
      dueDate
      dueTime
      user {
        _id
      }
    }
  }
`;

export const GET_PROFILE = gql`
  query GetProfile {
    me {
      _id
      username
      email
      avatarColor
    }
  }
`;