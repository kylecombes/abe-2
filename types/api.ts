export type ID = string;
type DateWithTime = Date;
type DateOnly = string;

export interface RecurrenceRule {
  // TODO: Do this properly
  count?: number;
  interval?: number;
  until?: DateOnly;
}

export interface Tag {
  /** A long description of the tag */
  description?: string;
  /** A UUID */
  id: string;
  /** The (short) name of the tag */
  name: string;
  /** The ID of the parent tag (if any) */
  parent?: string;
}

export interface Event {
  createdBy: ID;
  description?: string;
  end: DateWithTime | DateOnly;
  // Undefined if a new event that has not yet been saved
  id?: ID;
  location?: string;
  recurs?: RecurrenceRule;
  start: DateWithTime | DateOnly;
  tags: Tag[];
  title: string;
}
export type EventWithoutId = Omit<Event, 'id'>;
export type EventWithId = EventWithoutId & NonNullable<Pick<Event, 'id'>>;
