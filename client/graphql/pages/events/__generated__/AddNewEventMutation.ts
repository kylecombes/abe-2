/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DatetimeRangeInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddNewEventMutation
// ====================================================

export interface AddNewEventMutation_createEvent_event {
  __typename: "Event";
  id: number;
}

export interface AddNewEventMutation_createEvent {
  __typename: "CreateEventPayload";
  /**
   * The `Event` that was created by this mutation.
   */
  event: AddNewEventMutation_createEvent_event | null;
}

export interface AddNewEventMutation {
  /**
   * Creates a single `Event`.
   */
  createEvent: AddNewEventMutation_createEvent | null;
}

export interface AddNewEventMutationVariables {
  title: string;
  description?: string | null;
  whenWithTimes: DatetimeRangeInput;
}
