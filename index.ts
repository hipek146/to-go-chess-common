import { Subject } from "rxjs";
import { Game } from "./core/game";
import { Chessboard } from "./core/chessboard";
import { Player } from "./interfaces/player";

const game = new Game();

const c = new Chessboard();


class Gracz implements Player {
  color: 'white' | 'black';
  emitMove: Subject<string> = new Subject<string>();

  move(move: string) {
    this.emitMove.next(move);
  }

  receiveMove(move: string) {
    console.log(this.color + ' player received: ' + move)
  }
}

const g1 = new Gracz();
const g2 = new Gracz();

game.init({canvas: c, whitePlayer: g1, blackPlayer: g2});

g1.move("a4");
g2.move("Nf6");
g1.move("Ra3");
g2.move("Na6");
g1.move("h4");
g2.move("h5");
g1.move("Rhh3");
g2.move("e5");
g1.move("Ke2");
g2.move("Bb4");
