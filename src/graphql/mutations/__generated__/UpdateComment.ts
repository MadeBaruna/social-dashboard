/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateComment
// ====================================================

export interface UpdateComment_updateComment {
  __typename: "Comment";
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface UpdateComment {
  updateComment: UpdateComment_updateComment;
}

export interface UpdateCommentVariables {
  id: number;
  name: string;
  email: string;
  body: string;
}
