import { Canvas } from '../interfaces/canvas';

export class Chessboard implements Canvas {
    positionFEN: string;

    draw(newPosition: string) {
        this.positionFEN = newPosition;
        console.log('chessboard: ' + this.positionFEN);
    }
}
