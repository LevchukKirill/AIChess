import Piece, { Pieces } from "@/scripts/piece";

export default class Rook extends Piece {
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
    let enPassant;
    if (
      (moveDiffX !== 0 && moveDiffY === 0) ||
      (moveDiffY !== 0 && moveDiffX === 0)
    ) {
      if (
        !this.isTileOccupied(x, y, tileState) &&
        !this.isPathClosed(x, y, prevX, prevY, tileState)
      ) {
        enPassant = undefined;

        return true;
        //rook atack
      } else if (!this.isPathClosed(x, y, prevX, prevY, tileState)) {
        console.log("ATACK!");
        const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

        enPassant = undefined;

        return atackedPiece ?? false;
      }
    }
  }
}
