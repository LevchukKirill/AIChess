import { Pieces } from "@/scripts/piece";
import Pawn from "@/scripts/pieces/pawn";
import Bishop from "@/scripts/pieces/bishop";
import Rook from "@/scripts/pieces/rook";
import Queen from "@/scripts/pieces/queen";
import Knight from "@/scripts/pieces/knight";
import King from "@/scripts/pieces/king";

let enPassant: [x: number, y: number] | undefined;

export default class Rules {
  isValidMove(
    prevX: number,
    prevY: number,
    x: number,
    y: number,
    type: string,
    color: string,
    tileState: Pieces[],
  ): Pieces | undefined | boolean {
    //Pawn movement
    if (type === "P") {
      const pawnMove = new Pawn(x, y, type, color).possibleMove(
        prevX,
        prevY,
        tileState,
      );
      return pawnMove;
    }

    //Bishop movement
    if (type === "B") {
      const bishopMove = new Bishop(x, y, type, color).possibleMove(
        prevX,
        prevY,
        tileState,
      );
      return bishopMove;
    }

    //Rook movement
    if (type === "R") {
      const rookMove = new Rook(x, y, type, color).possibleMove(
        prevX,
        prevY,
        tileState,
      );
      return rookMove;
    }
    //Queen movement
    if (type === "Q") {
      const queenMove = new Queen(x, y, type, color).possibleMove(
        prevX,
        prevY,
        tileState,
      );
      return queenMove;
    }
    //Knight movement
    if (type === "N") {
      const knightMove = new Knight(x, y, type, color).possibleMove(
        prevX,
        prevY,
        tileState,
      );
      return knightMove;
    }
    //King movement
    if (type === "K") {
      const kingMove = new King(x, y, type, color).possibleMove(
        prevX,
        prevY,
        tileState,
      );
      return kingMove;
    }

    return false;
  }
}
