import gql from 'graphql-tag';

export const UpdateComment = gql`
  mutation UpdateComment(
    $id: Int!
    $name: String!
    $email: String!
    $body: String!
  ) {
    updateComment(id: $id, name: $name, email: $email, body: $body) {
      id
      name
      email
      body
    }
  }
`;
