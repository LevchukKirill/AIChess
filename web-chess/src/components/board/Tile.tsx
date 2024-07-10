import React from 'react';
import { Pieces } from './Board';

const Tile = (props: any) => {
  const pieces: Array<Pieces> = props.pieces;
  let skipFlag = false;

  Object.values(pieces).map((piece) => {
    if (
      props.numbers % 2 === 0 &&
      Number(piece.file) - 1 === props.i &&
      Number(piece.rank) - 1 === props.j
    ) {
      skipFlag = true;
      props.board.push(
        <div
          key={`[${horizontalAxis[i]},${verticalAxis[j]}]`}
          className={`${styles.tile}, ${styles.black}`}
        >
          <img
            src={`assets/images/alpha/${piece.pieceColor}${piece.pieceType}.png`}
            className={styles.chess_piece}
            alt='chess_piece'
          />
        </div>
      );
    }
    if (
      numbers % 2 !== 0 &&
      Number(piece.file) - 1 === i &&
      Number(piece.rank) - 1 === j
    ) {
      skipFlag = true;

      board.push(
        <div
          key={`[${horizontalAxis[i]},${verticalAxis[j]}]`}
          className={`${styles.tile}, ${styles.white}`}
        >
          <img
            src={`assets/images/alpha/${piece.pieceColor}${piece.pieceType}.png`}
            className={styles.chess_piece}
            alt='chess_piece'
          />
        </div>
      );
    }
  });

  if (numbers % 2 === 0 && !skipFlag) {
    board.push(
      <div
        key={`[${horizontalAxis[i]},${verticalAxis[j]}]`}
        className={`${styles.tile}, ${styles.black}`}
      >
        [{horizontalAxis[i]},{verticalAxis[j]}]
      </div>
    );
  } else if (numbers % 2 !== 0 && !skipFlag) {
    board.push(
      <div
        key={`[${horizontalAxis[i]},${verticalAxis[j]}]`}
        className={`${styles.tile}, ${styles.white}`}
      >
        [{horizontalAxis[i]},{verticalAxis[j]}]
      </div>
    );
  }
};

export default Tile;
