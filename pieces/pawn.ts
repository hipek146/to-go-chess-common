import { Move } from ".";
import { BoardInfo } from "../core/board-info";
import { Piece } from "./piece";

export class Pawn extends Piece {
    symbol = 'p';

    possibleMoves(boardInfo: BoardInfo): Move[] {
        let moves: Move[] = [];

        if (this.color === 'white') {
            if (this.pushMove(boardInfo, moves, this.row + 1, this.column, 'move') && this.row === 2) {
                this.pushMove(boardInfo, moves, this.row + 2, this.column, 'move');
            }
            this.pushMove(boardInfo, moves, this.row + 1, this.column + 1, 'capture');
            this.pushMove(boardInfo, moves, this.row + 1, this.column - 1, 'capture');
        }
        else {
            if (this.pushMove(boardInfo, moves, this.row - 1, this.column, 'move') && this.row === 7) {
                this.pushMove(boardInfo, moves, this.row - 2, this.column, 'move');
            }
            this.pushMove(boardInfo, moves, this.row - 1, this.column + 1, 'capture');
            this.pushMove(boardInfo, moves, this.row - 1, this.column - 1, 'capture');
        }
        return moves;
    }

}