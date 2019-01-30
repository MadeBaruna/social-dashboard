/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAlbums
// ====================================================

export interface GetAlbums_albums {
  __typename: "Album";
  id: number;
  title: string;
  thumbnail: string;
}

export interface GetAlbums {
  albums: GetAlbums_albums[];
}

export interface GetAlbumsVariables {
  userId: number;
}
