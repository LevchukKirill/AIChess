import { Pieces } from '@/components/board/Board';

export default class Rules {
  isTileOccupied(x: Number, y: Number, tileState: Pieces[]): boolean {
    // console.log(x, y);
    // tileState.map((e) => {
    //   console.log(e);
    // });
    const piece = tileState.find(
      (p) => Number(p.file) - 1 === x && Number(p.rank) - 1 === y
    );
    if (piece) {
      return true;
    } else return false;
  }

  isTileOccupiedByOp(
    x: Number,
    y: Number,
    tileState: Pieces[],
    color: String
  ): boolean {
    const piece = tileState.find(
      (p) =>
        Number(p.file) - 1 === x &&
        Number(p.rank) - 1 === y &&
        p.pieceColor !== color
    );
    if (piece) {
      return true;
    } else return false;
  }

  isValidMove(
    prevX: Number,
    prevY: Number,
    x: Number,
    y: Number,
    type: String,
    color: String,
    tileState: Pieces[]
  ): boolean {
    // console.log(`prev pos ${prevX}${prevY}`);
    // console.log(`new pos ${x}${y}`);
    // console.log(`type ${type}`);
    // console.log(`color ${color}`);

    //PAWN movement
    const moveDiffY = Number(y) - Number(prevY);
    const moveDiffX = Number(x) - Number(prevX);
    if (type === 'P') {
      const specialRow = color === 'w' ? 1 : 6;
      const directionPath = color === 'w' ? 1 : -1;

      if (
        prevX === x &&
        moveDiffY === 2 * directionPath &&
        prevY === specialRow
      ) {
        if (
          !this.isTileOccupied(x, y, tileState) &&
          !this.isTileOccupied(x, Number(y) - directionPath, tileState)
        ) {
          return true;
        }
      } else if (prevX === x && moveDiffY === directionPath) {
        if (!this.isTileOccupied(x, y, tileState)) {
          return true;
        }
        //PAWN atack
      } else if (moveDiffX === -1 && moveDiffY === directionPath) {
        if (this.isTileOccupiedByOp(x, y, tileState, color)) {
          console.log('ATACK!');
          return true;
        }
      } else if (moveDiffX === 1 && moveDiffY === directionPath) {
        if (this.isTileOccupiedByOp(x, y, tileState, color)) {
          console.log('ATACK!');
          return true;
        }
      }
    }
    return false;
  }
}
