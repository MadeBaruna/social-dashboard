import gql from 'graphql-tag';

export const GetPost = gql`
  query GetPost($id: Int!) {
    post(id: $id) {
      userId
      id
      title
      body
      comments {
        id
        name
        email
        body
      }
    }
  }
`;
