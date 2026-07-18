import React from 'react';

import styles from './styles.module.scss';

export default function NotFoundBlock() {
  return (
    <h1 className={styles.title}>
      <span>☹️</span>
      <br />
      Ничего не найдено
    </h1>
  );
}
