import { Pieces } from '@/components/board/Board';

let enPassant: [x: number, y: number] | undefined;

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
    console.log('prev x', prevX, 'prev y', prevY, 'x', x, 'y', y, tileState);
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

  isKingNear(x: number, y: number, tileState: Pieces[], color: string) {
    const kingOp = tileState.find(
      (p) =>
        p.pieceType === 'K' &&
        p.pieceColor !== color &&
        (p.file - 1 === x + 1 || p.file - 1 === x - 1 || p.file - 1 === x) &&
        (p.rank - 1 === y + 1 || p.rank - 1 === y - 1 || p.rank - 1 === y)
    );
    // const piece = tileState.find((p) => p.file - 1 === x && p.rank - 1 === y);

    console.log(kingOp, x, y);
    if (kingOp) {
      console.log(kingOp);
      return true;
    } else {
      console.log('clear');
      return false;
    }
  }

  isTileOccupiedByOp(
    x: number,
    y: number,
    tileState: Pieces[],
    color: string,
    directionPath: number = 0
  ): Pieces | undefined {
    const piece = tileState.find((p) => {
      return (
        ((p.file - 1 === x && p.rank - 1 === y) ||
          (enPassant &&
            enPassant[0] === x &&
            enPassant[1] === y &&
            p.file - 1 === enPassant[0] &&
            p.rank - 1 + directionPath === enPassant[1])) &&
        p.pieceColor !== color
      );
    });

    // if (piece) {
    //   return true;
    // } else {
    //   console.log(enPassant);
    //   return false;
    // }
    console.log(enPassant, piece);
    return piece;
  }

  isValidMove(
    prevX: number,
    prevY: number,
    x: number,
    y: number,
    type: string,
    color: string,
    tileState: Pieces[]
  ): Pieces | boolean {
    const moveDiffY = y - prevY;
    const moveDiffX = x - prevX;
    //Pawn movement
    if (type === 'P') {
      // console.log(tileState);
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
          enPassant = [x, y - directionPath];

          return true;
        }
      } else if (prevX === x && moveDiffY === directionPath) {
        if (!this.isTileOccupied(x, y, tileState)) {
          enPassant = undefined;

          return true;
        }
        //pawn atack
      } else if (
        (moveDiffX === -1 || moveDiffX === 1) &&
        moveDiffY === directionPath
      ) {
        const atackedPiece = this.isTileOccupiedByOp(
          x,
          y,
          tileState,
          color,
          directionPath
        );

        enPassant = undefined;
        // if (atackedPiece)
        return atackedPiece ?? false;
        // console.log('en passant');
        // enPassant = undefined;

        // return true;
      }
    }
    //Bishop movement
    if (type === 'B')
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

          console.log('ATACK!');
          enPassant = undefined;

          return atackedPiece ?? false;
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
          enPassant = undefined;

          return true;
          //rook atack
        } else if (!this.isPathClosed(x, y, prevX, prevY, tileState)) {
          console.log('ATACK!');
          const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

          enPassant = undefined;

          return atackedPiece ?? false;
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
          enPassant = undefined;

          return true;
          //rook style atack
        } else if (!this.isPathClosed(x, y, prevX, prevY, tileState)) {
          enPassant = undefined;
          const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

          console.log('ATACK!');
          return atackedPiece ?? false;
        }
      } else if ((moveDiffY + moveDiffX) % 2 === 0) {
        //bishop like movement
        if (!this.isPathClosed(x, y, prevX, prevY, tileState)) {
          enPassant = undefined;

          return true;
          //bishop style atack
        } else if (!this.isPathClosed(x, y, prevX, prevY, tileState)) {
          enPassant = undefined;

          const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);
          console.log('ATACK!');
          return atackedPiece ?? false;
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
          enPassant = undefined;

          return true;
          //knight atack
        } else {
          console.log('ATACK!');
          enPassant = undefined;

          const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

          return atackedPiece ?? false;
        }
      }
    }
    //king movement
    if (type === 'K') {
      if (
        (Math.abs(moveDiffX) === 1 && Math.abs(moveDiffY) <= 1) ||
        (Math.abs(moveDiffY) === 1 && Math.abs(moveDiffX) <= 1)
      ) {
        if (
          !this.isTileOccupied(x, y, tileState) &&
          !this.isKingNear(x, y, tileState, color)
        ) {
          enPassant = undefined;

          return true;
          //king atack
        } else if (!this.isKingNear(x, y, tileState, color)) {
          console.log('ATACK!');
          enPassant = undefined;

          const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

          return atackedPiece ?? false;
        }
      }
    }

    return false;
  }
}
