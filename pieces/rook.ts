import { Piece } from "./piece";

export class Rook extends Piece {
    symbol = 'r';

    move(row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }
}