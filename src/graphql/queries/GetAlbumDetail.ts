import gql from 'graphql-tag';

export const GetAlbumDetail = gql`
  query GetAlbumDetail($albumId: Int!) {
    album(albumId: $albumId) {
      title
      photos {
        id
        title
        thumbnailUrl
        url
      }
    }
  }
`;
