import { timeStamp } from "console";
import { Piece } from "../pieces";

export class BoardInfo {
    private board: Piece[][] = [];

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
}