import gql from 'graphql-tag';

export const GetAlbums = gql`
  query GetAlbums($userId: Int!) {
    albums(userId: $userId) {
      id
      title
      thumbnail
    }
  }
`;
