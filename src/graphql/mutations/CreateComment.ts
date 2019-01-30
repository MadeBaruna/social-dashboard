import gql from 'graphql-tag';

export const CreateComment = gql`
  mutation CreateComment(
    $postId: Int!
    $name: String!
    $email: String!
    $body: String!
  ) {
    comment(postId: $postId, name: $name, email: $email, body: $body) {
      id
      name
      email
      body
    }
  }
`;
