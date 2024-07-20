import React from 'react';
import styles from '../styles/loadingskeleton.module.css';

const LoadingSkeleton = () => {
  const skeletonArray = new Array(4).fill(0); // Adjust the number based on the maximum number of skeleton cards you want to show

  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonSearchBox}></div>
      <div className={styles.skeletonCardContainer}>
        {skeletonArray.map((_, index) => (
          <div className={styles.skeletonCard} key={index}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonTag}></div>
            <div className={styles.skeletonTag}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
