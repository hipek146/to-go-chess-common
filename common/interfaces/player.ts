import { Subject } from 'rxjs';

export interface Player {
	emitMove: Subject<string>;
}
