import * as React from 'react';
import { LinkButton } from '../LinkButton/LinkButton';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (
    <div className={styles.container}>
      <LinkButton to="/events/new">Add Event</LinkButton>
    </div>
  );
}
