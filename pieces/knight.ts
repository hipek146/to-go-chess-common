import { Piece } from "./piece";

export class Knight extends Piece {
    symbol = 'n';

    move(row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }
}