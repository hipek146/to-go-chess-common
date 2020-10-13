import { Canvas } from './interfaces/canvas';
import { Player } from './interfaces/player';

export class Game {

	whitePlayer: Player;
	blackPlayer: Player;

	chessboard: Canvas;

	turn: Player;

	positionFEN: string;

	init(chessboard: Canvas, whitePlayer: Player, blackPlayer: Player, positionFEN?: string) {
		this.chessboard = chessboard;
		this.whitePlayer = whitePlayer;
		this.blackPlayer = blackPlayer;

		this.positionFEN = positionFEN || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

		whitePlayer.emitMove.subscribe((move) => this.onMove(whitePlayer, move));
		blackPlayer.emitMove.subscribe((move) => this.onMove(blackPlayer, move));

		if (positionFEN[positionFEN.indexOf(' ') + 1] === 'w') {
			this.turn = whitePlayer;
		}
		else {
			this.turn = blackPlayer;
		}
	}

	private onMove(player: Player, move: string) {
		if (this.turn === player) {
			this.changePosition(move);
		}
	}

	private changePosition(move: string) {
		const positionFEN = this.positionFEN;
		if (!move?.length) throw new Error ('blank move');

		let piece: string;
		let white = false;

		if (positionFEN[positionFEN.indexOf(' ') + 1] === 'w') {
			white = true;
		}

		let letter = move[0].toLowerCase();

		switch (letter) {
			case 'r':
				piece = 'rock';
				break;
			case 'n':
				piece = 'knight';
				break;
			case 'b':
				piece = 'bishop';
				break
			case 'q':
				piece = 'queen';
				break;
			case 'k':
				piece = 'king';
				break;
			default:
				piece = 'pawn';
				letter = 'p';
		}
		if (white) {
			letter = letter.toUpperCase();
		}

		let x = 1;
		let y = 8;
		for(let i = 0; positionFEN[i] !== ' '; i++) {
			if(positionFEN[i] === '/') {
				y--;
				x = 1;
				continue;
			}
			if(positionFEN[i] === letter) {
				break;
			}
			const number = Number(positionFEN[i]);
			if (isNaN(number)) {
				x++;
			}
			else {
				x += number;
			}
		}

		console.log(x + ' ' + y);
	}

}
