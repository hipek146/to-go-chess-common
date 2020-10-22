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

    move(row: number, column: number): void {
        this.row = row;
        this.column = column;
    }

    possibleMoves(boardInfo: BoardInfo): Move[] {
        return [];
    }

    checkMove(boardInfo: BoardInfo, row: number, column: number, type: 'move' | 'capture'): boolean {
        return this.possibleMoves(boardInfo).findIndex(move => {
            return move.row === row && move.column === column && move.type === type
        }) >= 0;
    }

    protected pushMove(boardInfo: BoardInfo, moves: Move[], row: number, column: number, type?: 'move' | 'capture'): boolean {
        if (row >= 1 && row <=8 && column >=1 && column <= 8) {
            if (boardInfo.get(row, column) && type !== 'move') {
                moves.push({row, column, type: 'capture'});
                return false;
            } else if (type !== 'capture') {
                moves.push({row, column, type: 'move'});
                return true;
            }
        }
        return false;
    }

}