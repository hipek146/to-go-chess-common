interface PieceConfig {
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

    abstract move(row: number, column: number): boolean;

}