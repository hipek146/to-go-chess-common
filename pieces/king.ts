import { Piece } from "./piece";

export class King extends Piece {
    symbol = 'k';

    move(row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }

}