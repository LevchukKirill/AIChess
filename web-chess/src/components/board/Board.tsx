import React from 'react';
import styles from './board.module.css';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const Board = () => {
  let board: object[] = [];
  console.log(verticalAxis.length);
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const numbers = j + i + 2;
      if (numbers % 2 === 0) {
        board.push(
          <div
            key={verticalAxis[i]}
            className={`${styles.tile}, ${styles.black}`}
          >
            [{horizontalAxis[i]}
            {verticalAxis[j]}]
          </div>
        );
      } else {
        board.push(
          <div
            key={verticalAxis[i]}
            className={`${styles.tile}, ${styles.white}`}
          >
            [{horizontalAxis[i]}
            {verticalAxis[j]}]
          </div>
        );
      }
    }
  }

  return (
    <div className={styles.board}>
      <>{board}</>
    </div>
  );
};

export default Board;
