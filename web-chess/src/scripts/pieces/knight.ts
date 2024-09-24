import Piece, { Pieces } from "@/scripts/piece";

export default class Knight extends Piece {
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
      (Math.abs(moveDiffX) === 2 && Math.abs(moveDiffY) === 1) ||
      (Math.abs(moveDiffY) === 2 && Math.abs(moveDiffX) === 1)
    ) {
      if (!this.isTileOccupied(x, y, tileState)) {
        enPassant = undefined;

        return true;
        //knight atack
      } else {
        console.log("ATACK!");
        enPassant = undefined;

        const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

        return atackedPiece ?? false;
      }
    }
  }
}
