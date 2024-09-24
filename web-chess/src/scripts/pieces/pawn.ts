import Piece, { Pieces } from "@/scripts/piece";

export default class Pawn extends Piece {
  constructor(x: number, y: number, type: string, color: string) {
    super(x, y, type, color);
    this.file = x;
    this.rank = y;
    this.pieceColor = color;
    this.pieceType = type;
  }
  possibleMove(
    prevX: number,
    prevY: number,
    tileState: Pieces[],
    x: number = this.file,
    y: number = this.rank,
    type: string = this.pieceType,
    color: string = this.pieceColor,
  ): Pieces | undefined | boolean {
    const moveDiffY = y - prevY;
    const moveDiffX = x - prevX;
    const specialRow = color === "w" ? 1 : 6;
    const directionPath = color === "w" ? 1 : -1;
    let enPassant;
    if (
      prevX === x &&
      moveDiffY === 2 * directionPath &&
      prevY === specialRow
    ) {
      if (
        !super.isTileOccupied(x, y, tileState) &&
        !super.isTileOccupied(x, y - directionPath, tileState)
      ) {
        enPassant = [x, y - directionPath];

        return true;
      }
    } else if (prevX === x && moveDiffY === directionPath) {
      if (!super.isTileOccupied(x, y, tileState)) {
        enPassant = undefined;

        return true;
      }
      //pawn atack
    } else if (
      (moveDiffX === -1 || moveDiffX === 1) &&
      moveDiffY === directionPath
    ) {
      const atackedPiece = super.isTileOccupiedByOp(
        x,
        y,
        tileState,
        color,
        directionPath,
      );

      enPassant = undefined;
      // if (atackedPiece)
      return atackedPiece ?? false;
      // console.log('en passant');
      // enPassant = undefined;

      // return true;
    }
  }
}
