/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment_comment {
  __typename: "Comment";
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateComment {
  comment: CreateComment_comment;
}

export interface CreateCommentVariables {
  postId: number;
  name: string;
  email: string;
  body: string;
}
