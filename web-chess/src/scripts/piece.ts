export interface Pieces {
  file: number;
  rank: number;
  pieceColor: string;
  pieceType: string;
  enPassant: string;
}

let enPassant: [x: number, y: number] | undefined;

export default class Piece {
  file: number;
  rank: number;
  pieceColor: string;
  pieceType: string;
  // tileState: Pieces[];
  constructor(
    file: number,
    rank: number,
    pieceColor: string,
    pieceType: string,
    // tileState: Pieces[],
  ) {
    this.file = file;
    this.rank = rank;
    this.pieceColor = pieceColor;
    this.pieceType = pieceType;
    // this.tileState = tileState;
  }

  isTileOccupied(x: number, y: number, tileState: Pieces[]): boolean {
    const piece = tileState.find((p) => p.file - 1 === x && p.rank - 1 === y);
    if (piece) {
      return true;
    } else return false;
  }

  isTileOccupiedByOp(
    x: number,
    y: number,
    tileState: Pieces[],
    color: string,
    directionPath: number = 0,
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
    console.log(enPassant, piece);
    return piece;
  }
  isPathClosed(
    x: number,
    y: number,
    prevX: number,
    prevY: number,
    tileState: Pieces[],
  ): boolean {
    let path: boolean = false;
    let directionPathX: boolean;
    let directionPathY: boolean;
    let oneLineXMove: boolean = false;
    let oneLineYMove: boolean = false;

    if (prevX - x > 0)
      directionPathX = false; // left
    else directionPathX = true; // right

    if (prevY - y > 0)
      directionPathY = false; // down
    else directionPathY = true; // up

    if (prevX - x === 0) oneLineXMove = true;

    if (prevY - y === 0) oneLineYMove = true;
    console.log("prev x", prevX, "prev y", prevY, "x", x, "y", y, tileState);
    if (oneLineXMove || oneLineYMove) {
      if (oneLineXMove) {
        console.log("blyaaaaaa");
        if (directionPathY) {
          for (let i = 1; prevY + i < y; i++) {
            console.log("path", prevY + i, x, prevX);
            path = this.isTileOccupied(prevX, prevY + i, tileState);
            if (path) return true;
          }
        }
        if (!directionPathY) {
          for (let i = 1; prevY - i > y; i++) {
            console.log("path", prevY - i, x, prevX);

            path = this.isTileOccupied(prevX, prevY - i, tileState);
            if (path) return true;
          }
        }
      }

      if (oneLineYMove) {
        console.log("blyaaaaaa 1");
        if (directionPathX) {
          for (let i = 1; prevX + i < x; i++) {
            path = this.isTileOccupied(prevX + i, prevY, tileState);
            console.log("path", prevX + i, y, prevY, path);
            if (path) return true;
          }
        }
        if (!directionPathX) {
          for (let i = 1; prevX - i > x; i++) {
            // console.log('path', prevX - i, y, prevY);
            path = this.isTileOccupied(prevX - i, prevY, tileState);
            console.log("path", prevX - i, y, prevY, path);
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
        console.log("path", prevX - i, prevY + i);
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
}
