import * as React from 'react';
import { ID, Tag as TagType } from '../../../types/api';
import { Tag } from './_internal/Tag';

import styles from './_internal/styles.module.css';

interface TagListProps {
  onTagClick?: (tag: TagType) => void;
  selectedTags?: Set<ID>;
  tags: TagType[];
}

export function TagList({ onTagClick, selectedTags, tags }: TagListProps) {
  return (
    <div className={styles.TagList} role="group">
      {tags.map((t) => (
        <Tag
          key={t.id}
          onClick={() => onTagClick(t)}
          selected={selectedTags && selectedTags.has(t.id)}
          tag={t}
        />
      ))}
    </div>
  );
}
