import Piece, { Pieces } from "@/scripts/piece";

export default class Bishop extends Piece {
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
    if ((moveDiffY + moveDiffX) % 2 === 0) {
      if (
        !this.isTileOccupied(x, y, tileState) &&
        !this.isPathClosed(x, y, prevX, prevY, tileState)
      ) {
        enPassant = undefined;
        return true;
      }
      //Bishop atack
      else if (!this.isPathClosed(x, y, prevX, prevY, tileState)) {
        const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

        console.log("ATACK!");
        enPassant = undefined;

        return atackedPiece ?? false;
      }
    }
  }
}
