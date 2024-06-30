'use client';
import React, { useEffect } from 'react';
import styles from './board.module.css';
import Image from 'next/image';
import parserFEN from '@/scripts/fenParser';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const startFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 0';

interface Piece {
  image: String;
  x: Number;
  y: Number;
}

interface Pieces {
  file: Number;
  rank: Number;
  pieceColor: String;
  pieceType: String;
}

const pieces: Array<Pieces> = parserFEN(startFEN);

const Board = () => {
  // useEffect(() => {
  // }, []);

  let board: object[] = [];
  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const numbers = j + i + 2;
      let skipFlag = false;
      Object.values(pieces).map((piece) => {
        console.log(i, j);
        if (numbers % 2 === 0 && piece.file - 1 === i && piece.rank - 1 === j) {
          skipFlag = true;
          board.push(
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
        if (numbers % 2 !== 0 && piece.file - 1 === i && piece.rank - 1 === j) {
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

      // Object.values(pieces).map((piece) => {
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
      // return;
      // });
    }
  }
  return (
    <div className={styles.board}>
      <>{board}</>
    </div>
  );
};

export default Board;
