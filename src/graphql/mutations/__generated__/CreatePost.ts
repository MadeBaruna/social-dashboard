/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_post {
  __typename: "Post";
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface CreatePost {
  post: CreatePost_post;
}

export interface CreatePostVariables {
  userId: number;
  title: string;
  body: string;
}
