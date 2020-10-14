import { Piece } from "./piece";

export class Bishop extends Piece {
    symbol = 'b';

    move(row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }
}