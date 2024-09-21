import Piece, {Pieces} from "@/scripts/piece";

export default class Pawn extends Piece {
    possibleMove(prevX: number,
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
}