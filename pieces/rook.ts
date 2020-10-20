import { BoardInfo } from "../core/board-info";
import { Move, Piece } from "./piece";

export class Rook extends Piece {
    symbol = 'r';

    move(boardInfo: BoardInfo, row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }

    possibleMoves(boardInfo: BoardInfo): Move[] {
        let moves: Move[] = [];
        let row = this.row + 1;
        let column = this.column;
        while (row <= 8 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            row++;
        }
        row = this.row - 1;
        column = this.column;
        while (row >= 1 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            row--;
        }
        row = this.row;
        column = this.column + 1;
        while (column <=8 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            column++;
        }
        row = this.row;
        column = this.column - 1;
        while (column >= 1 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            column--;
        }
        return moves;
    }
}