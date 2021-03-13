import { ID } from '../../types/api';

export interface User {
  avatar?: string;
  id: ID;
  isSuperAdmin: boolean;
  name: {
    display?: string;
    first?: string;
    last?: string;
  };
}

export type NewOrExistingUser = Omit<User, 'id'> & Partial<Pick<User, 'id'>>;
