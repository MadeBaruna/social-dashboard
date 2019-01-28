import gql from 'graphql-tag';

export const GetUserDetail = gql`
  query GetUserDetail($id: Int!) {
    user(id: $id) {
      id
      name
      email
      username
      address {
        city
      }
      phone
      website
      company {
        name
      }
    }
  }
`;
