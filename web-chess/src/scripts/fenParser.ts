interface Piece {
  file: number;
  rank: number;
  pieceColor: string;
  pieceType: string;
  enPassant: string;
}

export default function parserFEN(fen: string) {
  let Pieces: Piece[] = [];
  //'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 0' -- start pos
  const fenBoard = fen.split(' ')[0];
  let file = 0,
    rank = 8;

  let allowColorToMove = fen.split(' ')[1];
  let enPassant = fen.split(' ')[3];
  // if (fen.split(' ')[3] !== '-') enPassant = true;

  for (let i = 0; i < fenBoard.length; i++) {
    let pieceColor = 'None';
    let pieceType = 'None';

    if (fenBoard[i] === '/') {
      file = 0;
      rank--;
    } else {
      if (!Number.isNaN(Number(fenBoard[i]))) {
        file += Number(fenBoard[i]);
      } else {
        pieceColor = fenBoard[i] == fenBoard[i].toUpperCase() ? 'w' : 'b';
        pieceType = fenBoard[i].toUpperCase();

        file++;
      }
    }
    if (pieceColor != 'None') {
      Pieces.push({ file, rank, pieceColor, pieceType, enPassant });
    }
  }
  return Pieces;
}
