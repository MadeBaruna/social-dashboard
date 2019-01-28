import gql from 'graphql-tag';

export const DeletePost = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`;
