import gql from 'graphql-tag';

export const UpdatePost = gql`
  mutation UpdatePost($id: Int!, $userId: Int!, $title: String!, $body: String!) {
    updatePost(id: $id, userId: $userId, title: $title, body: $body) {
      id
      userId
      title
      body
    }
  }
`;
