import { Canvas } from '../interfaces/canvas';

export class Chessboard implements Canvas {
    positionFEN: string;
    callback = () => {};

    draw(newPosition: string) {
        console.log(`drawing ${newPosition}`)
        this.positionFEN = newPosition;
        this.callback();
    }
}
