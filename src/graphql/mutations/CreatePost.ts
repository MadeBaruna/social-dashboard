import gql from 'graphql-tag';

export const CreatePost = gql`
  mutation CreatePost($userId: Int!, $title: String!, $body: String!) {
    post(userId: $userId, title: $title, body: $body) {
      userId
      id
      title
      body
    }
  }
`;
