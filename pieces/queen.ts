import { Piece } from "./piece";

export class Queen extends Piece {
    symbol = 'q';

    move(row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }
}