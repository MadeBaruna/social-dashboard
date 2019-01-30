import gql from 'graphql-tag';

export const DeleteComment = gql`
  mutation DeleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
