import Piece, {Pieces} from "@/scripts/piece";

export default class Pawn extends Piece {

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
    possibleMove(prevX: number,
                 prevY: number,
                 x: number,
                 y: number,
                 type: string,
                 color: string,
                 tileState: Pieces[]){

        const moveDiffY = y - prevY;
        const moveDiffX = x - prevX;
        let enPassant;
        if (
            (Math.abs(moveDiffX) === 1 && Math.abs(moveDiffY) <= 1) ||
            (Math.abs(moveDiffY) === 1 && Math.abs(moveDiffX) <= 1)
        ) {
            if (
                !this.isTileOccupied(x, y, tileState)
                && !this.isKingNear(x, y, tileState, color)
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
        }}
}