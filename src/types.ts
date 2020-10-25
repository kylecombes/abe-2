type ID = string;
type DateWithTime = Date;
type DateOnly = string;

export interface RecurrenceRule {
  // TODO: Do this properly
  count?: number;
  interval?: number;
  until?: DateOnly;
}

export interface Label {
  /** A long description of the label */
  description?: string;
  /** A UUID */
  id: string;
  /** The (short) name of the label */
  name: string;
  /** The ID of the parent label (if any) */
  parent?: string;
}

export interface Event {
  createdBy: ID;
  description?: string;
  end: DateWithTime | DateOnly;
  // Undefined if a new event that has not yet been saved
  id?: ID;
  labels: Label[];
  location?: string;
  recurs?: RecurrenceRule;
  start: DateWithTime | DateOnly;
  title: string;
}

export interface User {
  avatar?: string;
  id: ID;
  name: {
    display?: string;
    first?: string;
    last?: string;
  };
}

export type NewOrExistingUser = Omit<User, 'id'> & Partial<Pick<User, 'id'>>;
