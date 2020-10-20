import { BoardInfo } from "../core/board-info";
import { Move, Piece } from "./piece";

export class King extends Piece {
    symbol = 'k';

    move(boardInfo: BoardInfo, row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }

    possibleMoves(boardInfo: BoardInfo): Move[] {
        let moves: Move[] = [];
        let row = this.row + 1;
        let column = this.column;
        this.pushMove(boardInfo, moves, row, column, 'move');

        row = this.row - 1;
        column = this.column;
        this.pushMove(boardInfo, moves, row, column, 'move');
        
        row = this.row;
        column = this.column + 1;
        this.pushMove(boardInfo, moves, row, column, 'move');
        
        row = this.row;
        column = this.column - 1;
        this.pushMove(boardInfo, moves, row, column, 'move');

        row = this.row + 1;
        column = this.column + 1;
        this.pushMove(boardInfo, moves, row, column, 'move');
        
        row = this.row - 1;
        column = this.column + 1;
        this.pushMove(boardInfo, moves, row, column, 'move');
        
        row = this.row + 1;
        column = this.column - 1;
        this.pushMove(boardInfo, moves, row, column, 'move');

        row = this.row - 1;
        column = this.column - 1;
        this.pushMove(boardInfo, moves, row, column, 'move');

        return moves;
    }

}