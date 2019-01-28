/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users {
  __typename: "User";
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export interface GetUsers {
  users: GetUsers_users[];
}
