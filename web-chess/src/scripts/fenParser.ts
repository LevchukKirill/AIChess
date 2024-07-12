interface Piece {
  file: number;
  rank: number;
  pieceColor: string;
  pieceType: string;
}

export default function parserFEN(fen: string) {
  let Pieces: Piece[] = [];
  //'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 0' -- start pos
  const fenBoard = fen.split(' ')[0];
  let file = 0,
    rank = 8;

  let allowColorToMove = fen.split(' ')[1];

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
      Pieces.push({ file, rank, pieceColor, pieceType });
    }
  }
  return Pieces;
}
