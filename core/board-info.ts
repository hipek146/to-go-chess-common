import { timeStamp } from "console";
import { Piece, Pawn, Bishop, King, Knight, Queen, Rook, PieceConfig } from "../pieces";

export class BoardInfo {
    private board: Piece[][] = [];
    public castlingAvailability = {
		white: {kingside: true, queenside: true},
		black: {kingside: true, queenside: true}
    }
    public halfmoveClock: number = 0;
    public fullmoveClock: number = 0;
    public turn: 'white' | 'black';
    
    constructor() {
        for (let row = 0; row < 8; row++) {
            this.board[row] = new Array(8);
        }
    }

    set(piece: Piece): void {
        this.board[piece.row - 1][piece.column - 1] = piece;
    }

    get(row: number, column: number): Piece {
        return this.board[row - 1][column - 1];
    }

    find(symbol: string, color: 'white' | 'black'): Piece[] {
        let pieces: Piece[] = [];
        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                const piece = this.board[row][column];
                if (piece?.color === color && piece?.symbol === symbol) {
                    pieces.push(this.board[row][column]);
                }
            }
        }
        return pieces;
    }

    moved(piece: Piece, oldRow: number, oldColumn: number) {
        this.board[oldRow - 1][oldColumn - 1] = undefined;
        this.board[piece.row - 1][piece.column - 1] = piece;     
    }

    fromFEN(positionFEN: string) {
        let column = 1;
        let row = 8;
        let i: number;
    
        for(i = 0; positionFEN[i] !== ' '; i++) {
            if(positionFEN[i] === '/') {
                row--;
                column = 1;
                continue;
            }
            const number = Number(positionFEN[i]);
            if (isNaN(number)) {
                this.set(this.mapToPiece(positionFEN[i], row, column));;
                column++;
            }
            else {
                column += number;
            }
        }
        
        i++;
        this.turn = positionFEN[i] === 'w' ? 'white' : 'black';
        
        i+=2;
        const endCastlingIndex = positionFEN.indexOf(' ', i);
        const castlingFEN = positionFEN.substring(i, endCastlingIndex);
        this.castlingAvailability = {
            white: {kingside: false, queenside: false},
            black: {kingside: false, queenside: false}
        }
        if(castlingFEN !== '-') {
            while (positionFEN[i] != ' ') {
                switch (positionFEN[i]) {
                    case 'K':
                        this.castlingAvailability.white.kingside = true;
                        break;
                    case 'Q':
                        this.castlingAvailability.white.queenside = true;
                        break;
                    case 'k':
                        this.castlingAvailability.black.kingside = true;
                        break;
                    case 'q':
                        this.castlingAvailability.black.queenside = true;
                        break;
                }
                i++;
            }
            i--;
        }
        i+=2;
        //TO DO - bicie w przelocie
        i+=2;
        const endHalfmoveIndex = positionFEN.indexOf(' ', i);
        const halfmoveFEN = positionFEN.substring(i, endHalfmoveIndex);
        this.halfmoveClock = Number(halfmoveFEN);
        i = endHalfmoveIndex + 1;
        
        const fullmoveFEN = positionFEN.substring(i);
        this.fullmoveClock= Number(fullmoveFEN);
        return this;
    }

    public toFEN() {
		let FEN = '';
		for (let row = 8; row > 0; row--) {
			let blank = 0;
			for (let column = 1; column <= 8; column++) {
				let piece = this.get(row, column);
				if (piece) {
					if (blank) {
						FEN += blank;
					}
					FEN += piece.color === 'white' ?
						piece.getSymbol().toUpperCase() : piece.getSymbol().toLowerCase();
					blank = 0;
				}
				else {
					blank++;
				}
			}
			if (blank) {
				FEN += blank;
			}
			if (row > 1) {
				FEN += '/'
			}
		}

		return FEN + ' ' 
			+ (this.turn === 'white' ? 'w' : 'b')
			+ ' KQkq - '
			+ this.halfmoveClock + ' '
			+ this.fullmoveClock;
	}

    private mapToPiece(letter: string, row: number, column: number) {
		const color = letter.toUpperCase() === letter ? 'white' : 'black';
		const config: PieceConfig = {
			color, row, column
		}
		switch (letter.toLowerCase()) {
			case 'r':
				return new Rook(config);
			case 'n':
				return new Knight(config);
			case 'b':
				return new Bishop(config);
			case 'q':
				return new Queen(config);
			case 'k':
				return new King(config);
			default:
				return new Pawn(config);
		}
	}
}