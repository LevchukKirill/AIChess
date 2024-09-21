import Piece, {Pieces} from "@/scripts/piece";

export default class Bishop extends Piece {
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
}
}