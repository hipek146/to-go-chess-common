import { Subject } from 'rxjs';
import { Game } from './common/game';
import { Canvas } from './common/interfaces/canvas';
import { Player } from './common/interfaces/player';

const game = new Game();


const a = 1;

class Gracz implements Player {
	emitMove: Subject<string> = new Subject<string>();
}

const g1 = new Gracz();
const g2 = new Gracz();

game.init(a, g1 as Player, g2 as Player);

g1.emitMove.next('e4');
