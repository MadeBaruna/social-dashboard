/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePost
// ====================================================

export interface UpdatePost_updatePost {
  __typename: "Post";
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface UpdatePost {
  updatePost: UpdatePost_updatePost;
}

export interface UpdatePostVariables {
  id: number;
  userId: number;
  title: string;
  body: string;
}
