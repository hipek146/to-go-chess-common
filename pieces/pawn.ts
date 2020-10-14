import { Piece } from "./piece";

export class Pawn extends Piece {
    symbol = 'p';

    move(row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }
}