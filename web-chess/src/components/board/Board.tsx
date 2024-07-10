"use client";
import React, { useRef, useState } from "react";
import styles from "./board.module.css";
import parserFEN from "@/scripts/fenParser";
import Rules from "@/scripts/rules";

export interface Pieces {
  file: Number;
  rank: Number;
  pieceColor: String;
  pieceType: String;
}

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const startFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 0";
// const startFEN = '8/8/8/7r/6Pp/8/8/5k1K b - g3 0 1';

// const piecesPos: Array<Pieces> = parserFEN(startFEN);

const Board = () => {
  const [pieces, setPieces] = useState<Pieces[]>(parserFEN(startFEN));
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
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
      // console.log(e);
      setGridX(gridX);
      setGridY(gridY);
      const x = e.clientX - 50;
      const y = e.clientY - 50;

      element.style.position = "absolute";
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
        (p) => Number(p.file) - 1 === gridX && Number(p.rank) - 1 === gridY
      );
      const attackedPiece = pieces.find(
        (p) => Number(p.file) - 1 === x && Number(p.rank) - 1 === y
      );

      if (currentPiece) {
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
          const updatedPieces = pieces.reduce((results, piece) => {
            if (
              Number(piece.file) - 1 === gridX &&
              Number(piece.rank) - 1 === gridY
            ) {
              piece.file = x + 1;
              piece.rank = y + 1;
              results.push(piece);
            } else if (!(piece.file === x + 1 && piece.rank === y + 1)) {
              results.push(piece);
            }

            return results;
          }, [] as Pieces[]);

          setPieces(updatedPieces);

          // setPieces((value) => {
          //   const pieces = value.reduce((results, piece) => {
          //     if (
          //       piece.file === currentPiece.file &&
          //       piece.rank === currentPiece.rank
          //     ) {
          //       piece.file = x + 1;
          //       piece.rank = y + 1;
          //       results.push(piece);
          //     } else if (!(piece.file === x + 1 && piece.rank === y + 1)) {
          //       results.push(piece);
          //     }

          //     return results;
          //   }, [] as Pieces[]);

          //   return pieces;
          // });
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      console.log(currentPiece, attackedPiece);
      //updates position of pieces
      // setPieces((value) => {
      //   const pieces = value.map((p) => {
      //     if (Number(p.file) - 1 === gridX && Number(p.rank) - 1 === gridY) {
      //       const validMove = rules.isValidMove(
      //         gridX,
      //         gridY,
      //         x,
      //         y,
      //         p.pieceType,
      //         p.pieceColor,
      //         value
      //       );

      //       if (validMove) {
      //         p.file = x + 1;
      //         p.rank = y + 1;
      //       } else {
      //         activePiece.style.position = 'relative';
      //         activePiece.style.removeProperty('top');
      //         activePiece.style.removeProperty('left');
      //       }
      //     }
      //     return p;
      //   });

      //   return pieces;
      // });

      setActivePiece(null);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const board = boardRef.current;
    // console.log(board);
    if (activePiece && board) {
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      const minX = board.offsetLeft - 27;
      const minY = board.offsetTop - 25;
      const maxX = board.offsetLeft + board.clientWidth - 73;
      const maxY = board.offsetTop + board.clientHeight - 82;

      activePiece.style.position = "absolute";

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
        if (
          numbers % 2 === 0 &&
          Number(piece.file) - 1 === i &&
          Number(piece.rank) - 1 === j
        ) {
          // console.log(pieces);
          // setPieces([
          //   ...pieces,
          //   {
          //     file: i,
          //     rank: j,
          //     pieceColor: piece.pieceColor,
          //     pieceType: piece.pieceType,
          //   },
          // ]);
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
        if (
          numbers % 2 !== 0 &&
          Number(piece.file) - 1 === i &&
          Number(piece.rank) - 1 === j
        ) {
          // console.log(i, j);
          skipFlag = true;
          // setPieces([
          //   ...pieces,
          //   {
          //     file: i,
          //     rank: j,
          //     pieceColor: piece.pieceColor,
          //     pieceType: piece.pieceType,
          //   },
          // ]);
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
      // console.log(pieces);
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
