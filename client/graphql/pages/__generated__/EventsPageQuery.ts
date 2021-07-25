/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EventsPageQuery
// ====================================================

export interface EventsPageQuery_events_nodes_whenWithTimes_start {
  __typename: "DatetimeRangeBound";
  /**
   * The value at one end of our range.
   */
  value: any;
}

export interface EventsPageQuery_events_nodes_whenWithTimes_end {
  __typename: "DatetimeRangeBound";
  /**
   * The value at one end of our range.
   */
  value: any;
}

export interface EventsPageQuery_events_nodes_whenWithTimes {
  __typename: "DatetimeRange";
  /**
   * The starting bound of our range.
   */
  start: EventsPageQuery_events_nodes_whenWithTimes_start | null;
  /**
   * The ending bound of our range.
   */
  end: EventsPageQuery_events_nodes_whenWithTimes_end | null;
}

export interface EventsPageQuery_events_nodes {
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
  /**
   * The start and end datetime information for the event, if the start and end have both date and time information
   */
  whenWithTimes: EventsPageQuery_events_nodes_whenWithTimes | null;
  /**
   * When the event was originally added
   */
  createdAt: any;
}

export interface EventsPageQuery_events {
  __typename: "EventsConnection";
  /**
   * A list of `Event` objects.
   */
  nodes: (EventsPageQuery_events_nodes | null)[];
}

export interface EventsPageQuery {
  /**
   * Reads and enables pagination through a set of `Event`.
   */
  events: EventsPageQuery_events | null;
}
