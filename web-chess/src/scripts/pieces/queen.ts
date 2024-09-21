import Piece, {Pieces} from "@/scripts/piece";

export default class Pawn extends Piece {
    possibleMove(prevX: number,
                 prevY: number,
                 x: number,
                 y: number,
                 type: string,
                 color: string,
                 tileState: Pieces[]) {
        //rook like movement
        let enPassant;
        const moveDiffY = y - prevY;
        const moveDiffX = x - prevX;
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
}