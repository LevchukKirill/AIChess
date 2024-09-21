import Piece, {Pieces} from "@/scripts/piece";

export default class Pawn extends Piece {
    possibleMove (prevX: number,
                  prevY: number,
                  x: number,
                  y: number,
                  type: string,
                  color: string,
                  tileState: Pieces[]) {
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
                console.log('ATACK!');
                const atackedPiece = this.isTileOccupiedByOp(x, y, tileState, color);

                enPassant = undefined;

                return atackedPiece ?? false;
            }
        }
    }
}