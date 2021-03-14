import * as React from 'react';
import { Tag as TagType } from '../../../../types/api';

import styles from './styles.module.css';

interface TagProps {
  onClick?: () => void;
  selected?: boolean;
  tag: TagType;
}

export function Tag({ onClick, selected, tag }: TagProps) {
  return (
    <div
      aria-selected={selected === undefined ? null : selected}
      className={styles.Tag}
      onClick={onClick}
      role="checkbox"
    >
      {tag.name}
    </div>
  );
}
