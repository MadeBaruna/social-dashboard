/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_comments {
  __typename: "Comment";
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface GetPost_post {
  __typename: "Post";
  userId: number;
  id: number;
  title: string;
  body: string;
  comments: GetPost_post_comments[];
}

export interface GetPost {
  post: GetPost_post;
}

export interface GetPostVariables {
  id: number;
}
