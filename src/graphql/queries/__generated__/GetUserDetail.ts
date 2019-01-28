/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserDetail
// ====================================================

export interface GetUserDetail_user_address {
  __typename: "Address";
  city: string;
}

export interface GetUserDetail_user_company {
  __typename: "Company";
  name: string;
}

export interface GetUserDetail_user {
  __typename: "User";
  id: number;
  name: string;
  email: string;
  username: string;
  address: GetUserDetail_user_address;
  phone: string;
  website: string;
  company: GetUserDetail_user_company;
}

export interface GetUserDetail {
  user: GetUserDetail_user;
}

export interface GetUserDetailVariables {
  id: number;
}
