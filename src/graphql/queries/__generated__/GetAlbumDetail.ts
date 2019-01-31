/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAlbumDetail
// ====================================================

export interface GetAlbumDetail_album_photos {
  __typename: "Photos";
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

export interface GetAlbumDetail_album {
  __typename: "Album";
  title: string;
  photos: GetAlbumDetail_album_photos[];
}

export interface GetAlbumDetail {
  album: GetAlbumDetail_album;
}

export interface GetAlbumDetailVariables {
  albumId: number;
}
