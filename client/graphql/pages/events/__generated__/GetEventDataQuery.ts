/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEventDataQuery
// ====================================================

export interface GetEventDataQuery_event {
  __typename: "Event";
  id: number;
  /**
   * The title of the event
   */
  title: string;
  /**
   * A description of the event
   */
  description: string | null;
}

export interface GetEventDataQuery {
  event: GetEventDataQuery_event | null;
}

export interface GetEventDataQueryVariables {
  id: number;
}
