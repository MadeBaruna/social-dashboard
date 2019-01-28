/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_postsByUser {
  __typename: "Post";
  id: number;
  title: string;
  body: string;
}

export interface GetPosts {
  postsByUser: GetPosts_postsByUser[];
}

export interface GetPostsVariables {
  userId: number;
}
