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
    if (Math.abs(moveDiffY) === Math.abs(moveDiffX)) {
      if (
        !super.isTileOccupied(x, y, tileState) &&
        !super.isPathClosed(x, y, prevX, prevY, tileState)
      ) {
        console.log("bishop move xd");
        enPassant = undefined;
        return true;
      }

      //Bishop atack
      else if (!super.isPathClosed(x, y, prevX, prevY, tileState)) {
        const atackedPiece = super.isTileOccupiedByOp(x, y, tileState, color);

        console.log("ATACK lk bishop!");
        enPassant = undefined;

        return atackedPiece ?? false;
      }
    }
  }
}
