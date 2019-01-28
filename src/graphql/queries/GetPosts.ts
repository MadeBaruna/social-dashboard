import gql from 'graphql-tag';

export const GetPosts = gql`
  query GetPosts($userId: Int!) {
    postsByUser(userId: $userId) {
      userId
      id
      title
      body
    }
  }
`;
