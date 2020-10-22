import { BoardInfo } from "../core/board-info";
import { Move, Piece } from "./piece";

export class King extends Piece {
    symbol = 'k';

    possibleMoves(boardInfo: BoardInfo): Move[] {
        let moves: Move[] = [];
        let row = this.row + 1;
        let column = this.column;
        this.pushMove(boardInfo, moves, row, column);

        row = this.row - 1;
        column = this.column;
        this.pushMove(boardInfo, moves, row, column);
        
        row = this.row;
        column = this.column + 1;
        this.pushMove(boardInfo, moves, row, column);
        
        row = this.row;
        column = this.column - 1;
        this.pushMove(boardInfo, moves, row, column);

        row = this.row + 1;
        column = this.column + 1;
        this.pushMove(boardInfo, moves, row, column);
        
        row = this.row - 1;
        column = this.column + 1;
        this.pushMove(boardInfo, moves, row, column);
        
        row = this.row + 1;
        column = this.column - 1;
        this.pushMove(boardInfo, moves, row, column);

        row = this.row - 1;
        column = this.column - 1;
        this.pushMove(boardInfo, moves, row, column);

        return moves;
    }

}