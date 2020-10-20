import { Canvas } from '../interfaces/canvas';
import { Player } from '../interfaces/player';
import { Piece, Pawn, Bishop, King, Knight, Queen, Rook, PieceConfig } from '../pieces';
import { BoardInfo } from './board-info';

export class Game {

	private whitePlayer: Player;
	private blackPlayer: Player;

	private canvas: Canvas;

	private turn: Player;

	private positionFEN: string;

	private boardInfo: BoardInfo = new BoardInfo();

	private castlingAvailability = {
		white: {kingside: true, queenside: true},
		black: {kingside: true, queenside: true}
	}
	private halfmoveClock: number;
	private fullmoveNumber: number;

	init(config: {canvas: Canvas, whitePlayer: Player, blackPlayer: Player, positionFEN?: string}) {
		this.canvas = config.canvas;
		this.whitePlayer = config.whitePlayer;
		this.blackPlayer = config.blackPlayer;

		this.positionFEN = config.positionFEN || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

		this.updateGameWithFEN();

		this.whitePlayer.emitMove.subscribe((move) => this.onMove(this.whitePlayer, move));
		this.whitePlayer.color = 'white';
		this.blackPlayer.emitMove.subscribe((move) => this.onMove(this.blackPlayer, move));
		this.blackPlayer.color = 'black';


		this.canvas.draw(this.positionFEN);
	}


	private onMove(player: Player, move: string) {
		if (this.turn === player) {
			try {
				this.changePosition(move);
				this.updateFENWithGame();
				this.canvas.draw(this.positionFEN);

				if (player.color === 'white') {
					this.blackPlayer.receiveMove(move);
				}
				else {
					this.whitePlayer.receiveMove(move);
				}
			}
			catch(e) {}
		}
	}

	private changeTurn() {
		if (this.turn.color === 'white') {
			this.turn = this.blackPlayer;
		}
		else {
			this.turn = this.whitePlayer;
		}
	}

	private changePosition (move: string) {
		if (!move?.length) throw new Error ('blank move');

		let symbol: string;
		let offset = 0;

		if(['r', 'n', 'b', 'q', 'k'].includes(move[0].toLowerCase())) {
			symbol = move[0].toLowerCase();
			offset = 1;
		}
		else {
			symbol = 'p'
		}

		let specifiedRow: number;
		let specifiedColumn: number;
		if(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'x'].includes(move[offset + 1].toLowerCase())) {
			if (Number(move[offset]) >= 1 && Number(move[offset]) <= 8) {
				specifiedRow = Number(move[offset]);
			}
			else {
				const specifieLetter = move[offset].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
				if (specifieLetter >= 1 && specifieLetter <= 8) {
					specifiedColumn = specifieLetter;
				}
				else {
					throw new Error ('invalid move');
				}
			}
			offset++;
		}

		const destinationColumn = move[offset].charCodeAt(0) - 'a'.charCodeAt(0) + 1;
		const destinationRow = Number(move[offset + 1]);



		if (destinationRow < 1 || destinationRow > 8 || destinationColumn < 1 || destinationColumn > 8) {
			throw new Error ('invalid move');
		}

		let pieces = this.boardInfo.find(symbol, this.turn.color).filter(piece => {
			return piece.checkMove(this.boardInfo, destinationRow, destinationColumn);
		})
		pieces = pieces.filter(piece =>{
			if(specifiedRow) return piece.row === specifiedRow;
			else if(specifiedColumn) return piece.column === specifiedColumn;
			else return true;
		})
		if (pieces.length !== 1) {
			throw new Error ('invalid move');
		}
		const piece = pieces[0];
		const oldRow = piece.row;
		const oldColumn = piece.column;
		piece.move(this.boardInfo, destinationRow, destinationColumn);
		this.boardInfo.moved(piece, oldRow, oldColumn);

		//TO DO - bez bicia
		if (piece.getSymbol() !== 'p') {
			this.halfmoveClock++;
		}
		else {
			this.halfmoveClock = 0;
		}

		if (this.turn.color === 'black') {
			this.fullmoveNumber++;
		}
		//console.log(this.boardInfo);
		this.changeTurn();
	}

	private updateGameWithFEN() {
		const positionFEN = this.positionFEN;

		//this.pieces = [];

		let column = 1;
		let row = 8;
		let i: number;

		for(i = 0; positionFEN[i] !== ' '; i++) {
			if(positionFEN[i] === '/') {
				row--;
				column = 1;
				continue;
			}
			const number = Number(positionFEN[i]);
			if (isNaN(number)) {
				this.boardInfo.set(this.mapToPiece(positionFEN[i], row, column));;
				column++;
			}
			else {
				column += number;
			}
		}

		i++;
		if (positionFEN[i] === 'w') {
			this.turn = this.whitePlayer;
		}
		else {
			this.turn = this.blackPlayer;
		}
		i+=2;
		const endCastlingIndex = positionFEN.indexOf(' ', i);
		const castlingFEN = positionFEN.substring(i, endCastlingIndex);
		this.castlingAvailability = {
			white: {kingside: false, queenside: false},
			black: {kingside: false, queenside: false}
		}
		if(castlingFEN !== '-') {
			while (positionFEN[i] != ' ') {
				switch (positionFEN[i]) {
					case 'K':
						this.castlingAvailability.white.kingside = true;
						break;
					case 'Q':
						this.castlingAvailability.white.queenside = true;
						break;
					case 'k':
						this.castlingAvailability.black.kingside = true;
						break;
					case 'q':
						this.castlingAvailability.black.queenside = true;
						break;
				}
				i++;
			}
			i--;
		}
		i+=2;
		//TO DO - bicie w przelocie
		i+=2;
		const endHalfmoveIndex = positionFEN.indexOf(' ', i);
		const halfmoveFEN = positionFEN.substring(i, endHalfmoveIndex);
		this.halfmoveClock = Number(halfmoveFEN);
		i = endHalfmoveIndex + 1;
		
		const fullmoveFEN = positionFEN.substring(i);
		this.fullmoveNumber = Number(fullmoveFEN);
	}

	private updateFENWithGame() {
		let FEN = '';
		for (let row = 8; row > 0; row--) {
			let blank = 0;
			for (let column = 1; column <= 8; column++) {
				let piece = this.boardInfo.get(row, column);
				if (piece) {
					if (blank) {
						FEN += blank;
					}
					FEN += piece.color === 'white' ?
						piece.getSymbol().toUpperCase() : piece.getSymbol().toLowerCase();
					blank = 0;
				}
				else {
					blank++;
				}
			}
			if (blank) {
				FEN += blank;
			}
			if (row > 1) {
				FEN += '/'
			}
		}

		this.positionFEN = FEN + ' ' 
			+ (this.turn.color === 'white' ? 'w' : 'b')
			+ ' KQkq - '
			+ this.halfmoveClock + ' '
			+ this.fullmoveNumber;
	}

	private mapToPiece(letter: string, row: number, column: number) {
		const color = letter.toUpperCase() === letter ? 'white' : 'black';
		const config: PieceConfig = {
			color, row, column
		}
		switch (letter.toLowerCase()) {
			case 'r':
				return new Rook(config);
			case 'n':
				return new Knight(config);
			case 'b':
				return new Bishop(config);
			case 'q':
				return new Queen(config);
			case 'k':
				return new King(config);
			default:
				return new Pawn(config);
		}
	}

}
