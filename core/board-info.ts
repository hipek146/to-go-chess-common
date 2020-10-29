import { timeStamp } from "console";
import { Piece } from "../pieces";

export class BoardInfo {
    private board: Piece[][] = [];
    enPassant: {
        row: number;
        column: number;
    }

    castlingAvailability = {
		white: {kingside: true, queenside: true},
		black: {kingside: true, queenside: true}
    }
    
    allowCheck: boolean;

    constructor() {
        for (let row = 0; row < 8; row++) {
            this.board[row] = new Array(8);
        }
        this.enPassant = {
            row: undefined,
            column: undefined,  
        }
        this.allowCheck = false;
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

    capture(row: number, column: number) {
        this.board[row - 1][column - 1] = undefined; 
    }

    copy(): BoardInfo {
        const boardInfo = new BoardInfo();

        for (let row = 1; row <= 8; row++) {
            for (let column = 1; column <= 8; column++) {
                const piece = this.get(row, column);
                if (piece) {
                    boardInfo.set(piece.copy());
                }
            }
        }

        boardInfo.enPassant.row = this.enPassant.row;
        boardInfo.enPassant.column = this.enPassant.column;

        boardInfo.castlingAvailability.white = {...this.castlingAvailability.white};
        boardInfo.castlingAvailability.black = {...this.castlingAvailability.black};


        return boardInfo;
    }

    isCheck(): {white: boolean, black: boolean} {
        let white = false;
        let black = false;
        const whiteKing = this.find('k', 'white')[0];
        const blackKing = this.find('k', 'black')[0];
        if (!whiteKing || !blackKing) {
            throw new Error('There is no king');
        }
        this.allowCheck = true;
        for (let row = 1; row <=8; row++) {
            for (let column = 1; column <=8; column++) {
                const piece = this.get(row, column);
                if (piece && piece.color === 'white') {
                    if (piece.checkMove(this, blackKing.row, blackKing.column, 'capture')) {
                        black = true;
                    }
                }
                else if (piece && piece.color === 'black') {
                    if (piece.checkMove(this, whiteKing.row, whiteKing.column, 'capture')) {
                        white = true;
                    }
                }
            }
        }
        this.allowCheck = false;
        return {white, black};
    }
}