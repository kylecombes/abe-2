import { useState } from 'react';
import _uniqueId from 'lodash.uniqueid';

export function useUniqueId(prefix?: string) {
  const [id] = useState(_uniqueId(prefix));
  return id;
}
