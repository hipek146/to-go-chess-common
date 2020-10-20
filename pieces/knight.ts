import { BoardInfo } from "../core/board-info";
import { Move, Piece } from "./piece";

export class Knight extends Piece {
    symbol = 'n';

    move(boardInfo: BoardInfo, row: number, column: number): boolean {
        this.row = row;
        this.column = column;
        return true;
    }

    possibleMoves(boardInfo: BoardInfo): Move[] {
        let moves: Move[] = [];
        let row = this.row;
        let column = this.column;
        this.pushMove(boardInfo, moves, row + 2, column + 1, 'move');
        this.pushMove(boardInfo, moves, row + 2, column -1, 'move');
        this.pushMove(boardInfo, moves, row - 2, column + 1, 'move');
        this.pushMove(boardInfo, moves, row - 2, column - 1, 'move');
        this.pushMove(boardInfo, moves, row + 1, column + 2, 'move');
        this.pushMove(boardInfo, moves, row - 1, column + 2, 'move');
        this.pushMove(boardInfo, moves, row + 1, column - 2, 'move');
        this.pushMove(boardInfo, moves, row - 1, column - 2, 'move');

        return moves;
    }
}