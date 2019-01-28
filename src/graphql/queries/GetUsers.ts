import gql from 'graphql-tag';

export const GetUsers = gql`
  query GetUsers {
    users {
      id
      name
      username
      email
      website
    }
  }
`;
