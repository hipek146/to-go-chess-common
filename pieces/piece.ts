import { findIndex } from "rxjs/operator/findIndex";
import { BoardInfo } from "../core/board-info";

export interface Move {
    row: number;
    column: number;
    type: 'move' | 'capture';
}

export interface PieceConfig {
    color: 'white' | 'black';
    row: number;
    column: number;
}

export abstract class Piece {
    color: 'white' | 'black';
    row: number;
    column: number;
    abstract symbol: string;

    constructor(config: PieceConfig) {
        this.color = config.color;
        this.row = config.row;
        this.column = config.column;
    }

    getSymbol(): string {
        return this.symbol;
    }

    abstract move(boardInfo: BoardInfo, row: number, column: number): boolean;

    possibleMoves(boardInfo: BoardInfo): Move[] {
        return [];
    }

    checkMove(boardInfo: BoardInfo, row: number, column: number): boolean {
        return this.possibleMoves(boardInfo).findIndex(move => {
            return move.row === row && move.column === column && move.type === 'move'
        }) >= 0;
    }

    protected pushMove(boardInfo: BoardInfo, moves: Move[], row: number, column: number, type: 'move' | 'capture'): boolean {
        if (row >= 1 && row <=8 && column >=1 && column <= 8 && !boardInfo.get(row, column)) {
            moves.push({row, column, type})
            return true;
        }
        return false;
    }

}