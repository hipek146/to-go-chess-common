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

// g1.move("d4");
// g2.move("e5");
// g1.move("Nf3");
// g2.move("Nc6");
// g1.move("Bb5");
// g2.move("d6");
// g1.move("Bxc6");
// g2.move("bxc6");
// g1.move("d4");
// g2.move("exd4");
// g1.move("Qxd4");
// g2.move("Nf6");
// g1.move("Nc3");
// g2.move("d5");
// g1.move("exd5");
// g2.move("cxd5");
// g1.move("Qa4");
// g2.move("c6");
// g1.move("Bg5");
// g2.move("c5");

// g1.move('e4');
// g2.move('e6');
// g1.move('e5');
// g2.move('d5');
// g1.move('exd6');

// game.init({canvas: c, whitePlayer: g1, blackPlayer: g2, positionFEN: '8/7P/8/8/8/8/p7/8 w KQkq - 0 1'});
// g1.move('h8=B');
// g2.move('a1=R');

game.init({canvas: c, whitePlayer: g1, blackPlayer: g2, positionFEN: 'k7/rbr5/3B1B2/8/3B1B2/8/8/1K6 w - - 0 1'});
g1.move('Bd4e5');



