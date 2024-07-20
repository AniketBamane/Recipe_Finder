import React from 'react';
import styles from '../styles/loadingdots.module.css';

const LoadingDots = () => {
  return (
    <div className={styles.loadingDots}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default LoadingDots;
