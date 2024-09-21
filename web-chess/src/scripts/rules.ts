import { Pieces } from "@/scripts/piece";
import Pawn from "@/scripts/pieces/pawn";

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
    const moveDiffY = y - prevY;
    const moveDiffX = x - prevX;
    //Pawn movement
    if (type === "P") {
      const pawn = new Pawn(
        prevX,
        prevY,
        x,
        y,
        type,
        color,
        tileState,
      ).possibleMove(prevX, prevY, x, y, type, color, tileState);
      return pawn;
    }

    //Bishop movement
    if (type === "B") {
    }

    //rook movement
    if (type === "R") {
    }
    //queen movement
    if (type === "Q") {
    }
    //knight movement
    if (type === "N") {
    }
    //king movement
    if (type === "K") {
    }

    return false;
  }
}
