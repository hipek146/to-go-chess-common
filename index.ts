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

g1.move("Re4");
g2.move("Ne5");
g1.move("Kh6");
g2.move("a6");
