import { Pieces } from '@/components/board/Board';

export default class Rules {
  isTileOccupied(x: number, y: number, tileState: Pieces[]): boolean {
    const piece = tileState.find((p) => p.file - 1 === x && p.rank - 1 === y);
    if (piece) {
      return true;
    } else return false;
  }

  isPathClosed(
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    tileState: Pieces[]
  ): boolean {
    let path: boolean = false;
    let directionPathX: boolean;
    let directionPathY: boolean;
    let oneLineXMove: boolean = false;
    let oneLineYMove: boolean = false;

    if (prevX - x > 0) directionPathX = false; // left
    else directionPathX = true; // right

    if (prevY - y > 0) directionPathY = false; // down
    else directionPathY = true; // up

    if (prevX - x === 0) oneLineXMove = true;

    if (prevY - y === 0) oneLineYMove = true;
    // console.log('prev x', prevX, 'prev y', prevY, 'x', x, 'y', y, tileState);
    if (oneLineXMove || oneLineYMove) {
      if (oneLineXMove) {
        console.log('blyaaaaaa');
        if (directionPathY) {
          for (let i = 1; prevY + i < y; i++) {
            console.log('path', prevY + i, x, prevX);
            path = this.isTileOccupied(prevX, prevY + i, tileState);
            if (path) return true;
          }
        }
        if (!directionPathY) {
          for (let i = 1; prevY - i > y; i++) {
            console.log('path', prevY - i, x, prevX);

            path = this.isTileOccupied(prevX, prevY - i, tileState);
            if (path) return true;
          }
        }
      }

      if (oneLineYMove) {
        console.log('blyaaaaaa 1');
        if (directionPathX) {
          for (let i = 1; prevX + i < x; i++) {
            path = this.isTileOccupied(prevX + i, prevY, tileState);
            console.log('path', prevX + i, y, prevY, path);
            if (path) return true;
          }
        }
        if (!directionPathX) {
          for (let i = 1; prevX - i > x; i++) {
            // console.log('path', prevX - i, y, prevY);
            path = this.isTileOccupied(prevX - i, prevY, tileState);
            console.log('path', prevX - i, y, prevY, path);
            if (path) return true;
          }
        }
      }
    } else if (directionPathX && directionPathY) {
      // right + up
      for (let i = 1; prevX + i < x; i++) {
        // for (let j = 1; prevY + j < y; j++) {
        path = this.isTileOccupied(prevX + i, prevY + i, tileState);
        if (path) return true;
      }
      // }
    } else if (directionPathX && !directionPathY) {
      // right + down
      for (let i = 1; prevX + i < x; i++) {
        // for (let j = 1; prevY - j > y; j++) {
        path = this.isTileOccupied(prevX + i, prevY - i, tileState);
        if (path) return true;
      }
      // }
    } else if (!directionPathX && directionPathY) {
      // left + up
      for (let i = 1; prevX - i > x; i++) {
        // for (let j = 1; prevY + j < y; j++) {
        console.log('path', prevX - i, prevY + i);
        path = this.isTileOccupied(prevX - i, prevY + i, tileState);
        if (path) return true;
        // console.log(path);
        // }
      }
      // return true;
    } else if (!directionPathX && !directionPathY) {
      // left + down
      for (let i = 1; prevX - i > x; i++) {
        // for (let j = 1; prevY - j > y; j++) {
        path = this.isTileOccupied(prevX - i, prevY - i, tileState);
        if (path) return true;
      }
      // }
    }

    return false;
  }

  isTileOccupiedByOp(
    x: number,
    y: number,
    tileState: Pieces[],
    color: string
  ): boolean {
    const piece = tileState.find(
      (p) => p.file - 1 === x && p.rank - 1 === y && p.pieceColor !== color
    );
    if (piece) {
      return true;
    } else return false;
  }

  isValidMove(
    prevX: number,
    prevY: number,
    x: number,
    y: number,
    type: string,
    color: string,
    tileState: Pieces[]
  ): boolean {
    const moveDiffY = y - prevY;
    const moveDiffX = x - prevX;
    //Pawn movement
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
          !this.isTileOccupied(x, y - directionPath, tileState)
        ) {
          return true;
        }
      } else if (prevX === x && moveDiffY === directionPath) {
        if (!this.isTileOccupied(x, y, tileState)) {
          return true;
        }
        //Bishop atack
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
    //Bishop movement
    if (type === 'B')
      if ((moveDiffY + moveDiffX) % 2 === 0) {
        if (
          !this.isTileOccupied(x, y, tileState) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          return true;
        }
        //Bishop atack
        else if (
          this.isTileOccupiedByOp(x, y, tileState, color) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          console.log('ATACK!');
          return true;
        }
      }
    //rook movement
    if (type === 'R') {
      if (
        (moveDiffX !== 0 && moveDiffY === 0) ||
        (moveDiffY !== 0 && moveDiffX === 0)
      ) {
        if (
          !this.isTileOccupied(x, y, tileState) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          return true;
          //rook atack
        } else if (
          this.isTileOccupiedByOp(x, y, tileState, color) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          console.log('ATACK!');
          return true;
        }
      }
    }
    //queen movement
    if (type === 'Q') {
      //rook like movement
      if (
        (moveDiffX !== 0 && moveDiffY === 0) ||
        (moveDiffY !== 0 && moveDiffX === 0)
      ) {
        if (
          !this.isTileOccupied(x, y, tileState) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          return true;
          //rook style atack
        } else if (
          this.isTileOccupiedByOp(x, y, tileState, color) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          console.log('ATACK!');
          return true;
        }
      } else if ((moveDiffY + moveDiffX) % 2 === 0) {
        //bishop like movement
        if (
          !this.isTileOccupied(x, y, tileState) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          return true;
          //bishop style atack
        } else if (
          this.isTileOccupiedByOp(x, y, tileState, color) &&
          !this.isPathClosed(x, y, prevX, prevY, tileState)
        ) {
          console.log('ATACK!');
          return true;
        }
      }
    }
    //knight movement
    if (type === 'N') {
      if (
        (Math.abs(moveDiffX) === 2 && Math.abs(moveDiffY) === 1) ||
        (Math.abs(moveDiffY) === 2 && Math.abs(moveDiffX) === 1)
      ) {
        if (!this.isTileOccupied(x, y, tileState)) {
          return true;
          //knight atack
        } else if (this.isTileOccupiedByOp(x, y, tileState, color)) {
          console.log('ATACK!');
          return true;
        }
      }
    }
    //king movement
    if (type === 'K') {
      if (
        (Math.abs(moveDiffX) === 1 && Math.abs(moveDiffY) <= 1) ||
        (Math.abs(moveDiffY) === 1 && Math.abs(moveDiffX) <= 1)
      ) {
        if (!this.isTileOccupied(x, y, tileState)) {
          return true;
          //king atack
        } else if (this.isTileOccupiedByOp(x, y, tileState, color)) {
          console.log('ATACK!');
          return true;
        }
      }
    }

    return false;
  }
}
