import { BoardInfo } from "../core/board-info";
import { Move, Piece } from "./piece";

export class Bishop extends Piece {
    symbol = 'b';

    move(boardInfo: BoardInfo, row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }

    possibleMoves(boardInfo: BoardInfo): Move[] {
        let moves: Move[] = [];
        let row = this.row + 1;
        let column = this.column + 1;
        while (row <= 8 && column <=8 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            row++;
            column++;
        }
        row = this.row - 1;
        column = this.column + 1;
        while (row >= 1 && column <=8 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            row--;
            column++;
        }
        row = this.row + 1;
        column = this.column - 1;
        while (row <=8 && column >= 1 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            row++;
            column--;
        }
        row = this.row - 1;
        column = this.column - 1;
        while (row >=1 && column >= 1 && this.pushMove(boardInfo, moves, row, column, 'move')) {
            row--;
            column--;
        }

        return moves;
    }
}