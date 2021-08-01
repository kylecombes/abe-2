/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GetPostGraphileJWT
// ====================================================

export interface GetPostGraphileJWT_authenticate {
  __typename: "AuthenticatePayload";
  jwt: any | null;
}

export interface GetPostGraphileJWT {
  authenticate: GetPostGraphileJWT_authenticate | null;
}

export interface GetPostGraphileJWTVariables {
  email: string;
}
