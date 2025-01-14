'use client';
import React, { useRef, useState } from 'react';
import styles from './board.module.css';
import parserFEN from '@/scripts/fenParser';
import Rules from '@/scripts/rules';

export interface Pieces {
  file: number;
  rank: number;
  pieceColor: string;
  pieceType: string;
  enPassant: string;
}

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const startFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 0';
// const startFEN = '1qrk4/1b6/4K3/1P6/8/8/Q7/8 w - - 0 1';

const Board = () => {
  const [pieces, setPieces] = useState<Pieces[]>(parserFEN(startFEN));
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  // const [enPassantCoords, setEnPassantCoords] = useState<[x: number, y: number]>([-1, -1]);
  const boardRef = useRef<HTMLDivElement>(null);
  const rules = new Rules();

  function grabPiece(e: React.MouseEvent) {
    const board = boardRef.current;
    const element = e.target as HTMLElement;

    if (board && element.classList.contains(styles.chess_piece)) {
      const gridX = Math.floor((e.clientX - board.offsetLeft) / 100);
      const gridY = Math.abs(
        Math.ceil((e.clientY - board.offsetTop - 800) / 100)
      );
      setGridX(gridX);
      setGridY(gridY);
      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = 'absolute';
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const board = boardRef.current;
    if (activePiece && board) {
      const x = Math.floor((e.clientX - board.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - board.offsetTop - 800) / 100));

      const currentPiece = pieces.find(
        (p) => p.file - 1 === gridX && p.rank - 1 === gridY
      );
      const attackedPiece = pieces.find(
        (p) => p.file - 1 === x && p.rank - 1 === y
      );
      if (currentPiece) {
        console.log(currentPiece, x, y);
        const validMove = rules.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.pieceType,
          currentPiece.pieceColor,
          pieces
        );
        if (validMove) {
          //updates position of pieces
          if (typeof validMove !== 'boolean') {
            const idx = pieces.indexOf(validMove);
            console.log(pieces.slice().splice(idx, 1));
            setPieces((piece) => {
              const newArray = piece.slice();
              newArray.splice(idx, 1);
              return newArray;
            });
          }

          setPieces((pieces) => {
            const activeIdx = pieces.findIndex(
              (piece) => piece.file - 1 === gridX && piece.rank - 1 === gridY
            );
            console.log(activeIdx);
            const newPiece = {
              ...pieces[activeIdx],
              file: x + 1,
              rank: y + 1,
            };
            const newArray = pieces.slice();
            newArray.splice(activeIdx, 1, newPiece);
            console.log(newArray);
            return newArray;
          });

          // setPieces((pieces) =>
          //   pieces.reduce((results, piece) => {
          //     if (piece.file - 1 === gridX && piece.rank - 1 === gridY) {
          //       piece.file = x + 1;
          //       piece.rank = y + 1;
          //       results.push(piece);
          //     } else if (!(piece.file === x + 1 && piece.rank === y + 1)) {
          //       results.push(piece);
          //     }

          //     return results;
          //   }, [] as Pieces[])
          // );
        } else {
          activePiece.style.position = 'relative';
          activePiece.style.removeProperty('top');
          activePiece.style.removeProperty('left');
        }
      }
      console.log(currentPiece, attackedPiece);

      setActivePiece(null);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const board = boardRef.current;
    if (activePiece && board) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      const minX = board.offsetLeft - 27;
      const minY = board.offsetTop - 25;
      const maxX = board.offsetLeft + board.clientWidth - 73;
      const maxY = board.offsetTop + board.clientHeight - 82;

      activePiece.style.position = 'absolute';

      if (x < minX) activePiece.style.left = `${minX}px`;
      else if (x > maxX) activePiece.style.left = `${maxX}px`;
      else activePiece.style.left = `${x}px`;

      if (y < minY) activePiece.style.top = `${minY}px`;
      else if (y > maxY) activePiece.style.top = `${maxY}px`;
      else activePiece.style.top = `${y}px`;
    }
  }

  let board: object[] = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const numbers = j + i + 2;
      let skipFlag = false;

      pieces.map((piece) => {
        if (numbers % 2 === 0 && piece.file - 1 === i && piece.rank - 1 === j) {
          skipFlag = true;
          board.push(
            <div
              key={`[${horizontalAxis[i]},${verticalAxis[j]}]`}
              className={`${styles.tile}, ${styles.black}`}
            >
              <div
                style={{
                  backgroundImage: `url(assets/images/alpha/${piece.pieceColor}${piece.pieceType}.png)`,
                }}
                className={styles.chess_piece}
              ></div>
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
              <div
                style={{
                  backgroundImage: `url(assets/images/alpha/${piece.pieceColor}${piece.pieceType}.png)`,
                }}
                className={styles.chess_piece}
              ></div>
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
            {/* [{horizontalAxis[i]},{verticalAxis[j]}] */}
          </div>
        );
      } else if (numbers % 2 !== 0 && !skipFlag) {
        board.push(
          <div
            key={`[${horizontalAxis[i]},${verticalAxis[j]}]`}
            className={`${styles.tile}, ${styles.white}`}
          >
            {/* [{horizontalAxis[i]},{verticalAxis[j]}] */}
          </div>
        );
      }
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className={styles.board}
      ref={boardRef}
    >
      <>{board}</>
    </div>
  );
};

export default Board;
