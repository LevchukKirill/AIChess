import Game from '@/components/templates/game';
import styles from './../home.module.css';
import React from 'react';

const Page = () => {
  return (
    <div className={styles.content}>
      <Game />
    </div>
  );
};

export default Page;
