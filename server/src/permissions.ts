import { Role } from './types';

export const Roles: Record<string, Role> = {
  GroupAdmin: {
    permissions: [
      'GROUP_ADD_MEMBERS',
      'GROUP_READ_EVENTS',
      'GROUP_REMOVE_MEMBERS',
      'GROUP_SET_MEMBER_PERMISSIONS',
      'GROUP_ADD_EVENTS',
      'GROUP_EDIT_OTHERS_EVENTS',
    ],
  },
};
