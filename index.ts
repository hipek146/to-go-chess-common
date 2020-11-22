import { Subject } from "rxjs";
import { Game } from "./core/game";
import { Chessboard } from "./core/chessboard";
import { Player } from "./interfaces/player";
import ChessClockConfig from "./timer/chess-clock-config";

const game = new Game();

const c = new Chessboard();


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


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

const config: ChessClockConfig = {
  initMsBlack: 40000,
  initMsWhite: 40000,
  stepBlack: 1,
  stepWhite: 1,
  mode: {
    type: 'standard',
  },
  endCallback: (winner: string) => {
    console.log(winner + 'wins');
  }
}

game.init({canvas: c, whitePlayer: g1, chessClockConfig: config, blackPlayer: g2});


sleep(1000).then(() => {
  g1.move("d4");
  sleep(1000).then(() => {
    g2.move("e5");
    sleep(1000).then(() => {
      g1.move("Nf3");
      sleep(1000).then(() => {
        g1.move("Nf3");
        sleep(1000).then(() => {
          g2.move("Nc6");
          let result = [];
          game.gameTree.traverse(game.gameTree.root, result)
          console.log(result)
          game.stopClock();
          console.log(game.getTimes())
        });
      });
    });
  });
});

// g1.move('e4');
// g2.move('e6');
// g1.move('e5');
// g2.move('d5');
// g1.move('exd6');

// game.init({canvas: c, whitePlayer: g1, blackPlayer: g2, positionFEN: '8/7P/8/8/8/8/p7/8 w KQkq - 0 1'});
// g1.move('h8=B');
// g2.move('a1=R');

// game.init({canvas: c, whitePlayer: g1, blackPlayer: g2, positionFEN: 'k7/rbr5/3B1B2/8/3B1B2/8/8/1K6 w - - 0 1'});
// g1.move('Bd4e5');



