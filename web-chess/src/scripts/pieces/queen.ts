import Piece, { Pieces } from "@/scripts/piece";

export default class Queen extends Piece {
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
    //rook like movement
    let enPassant;
    const moveDiffY = y - prevY;
    const moveDiffX = x - prevX;
    if (
      (moveDiffX !== 0 && moveDiffY === 0) ||
      (moveDiffY !== 0 && moveDiffX === 0)
    ) {
      if (
        !super.isTileOccupied(x, y, tileState) &&
        !super.isPathClosed(x, y, prevX, prevY, tileState)
      ) {
        enPassant = undefined;

        return true;
        //rook style atack
      } else if (!super.isPathClosed(x, y, prevX, prevY, tileState)) {
        enPassant = undefined;
        const atackedPiece = super.isTileOccupiedByOp(x, y, tileState, color);

        console.log("ATACK!");
        return atackedPiece ?? false;
      }
    } else if (Math.abs(moveDiffY) === Math.abs(moveDiffX)) {
      //bishop like movement

      if (
        !super.isTileOccupied(x, y, tileState) &&
        !super.isPathClosed(x, y, prevX, prevY, tileState)
      ) {
        enPassant = undefined;
        return true;

        //bishop style atac
      } else if (!super.isPathClosed(x, y, prevX, prevY, tileState)) {
        enPassant = undefined;
        const atackedPiece = super.isTileOccupiedByOp(x, y, tileState, color);

        console.log("ATACK lk bishop!");

        return atackedPiece ?? false;
      }
    }
  }
}
