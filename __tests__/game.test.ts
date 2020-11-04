import { Subject } from "rxjs";
import { Game } from "../core/game";
import { Player } from "../interfaces/player";
import { Chessboard } from "../core/chessboard";

class TestPlayer implements Player {
    color: 'white' | 'black';
    emitMove: Subject<string> = new Subject<string>();
  
    move(move: string) {
        this.emitMove.next(move);
    }
  
    receiveMove(move: string) {}
}


test("Check test.", () => {
    const game = new Game();
    const chessboard = new Chessboard();
    const p1 = new TestPlayer();
    const p2 = new TestPlayer();
    game.init({canvas: chessboard, whitePlayer: p1, blackPlayer: p2, positionFEN: "rnb2bnr/ppp1k1pp/5p2/8/8/2PQ4/P4PPP/RNB1KBNR w KQ - 1 8"});

    p1.move("Qe3+"); // check
    expect(chessboard.positionFEN).toBe("rnb2bnr/ppp1k1pp/5p2/8/8/2P1Q3/P4PPP/RNB1KBNR b KQ - 2 8");
    p2.move("Kd7"); p1.move("Qd4+"); // check
    expect(chessboard.positionFEN).toBe("rnb2bnr/pppk2pp/5p2/8/3Q4/2P5/P4PPP/RNB1KBNR b KQ - 4 9");
});


test("Mate test.", () => {
    const game = new Game();
    const chessboard = new Chessboard();
    const p1 = new TestPlayer();
    const p2 = new TestPlayer();
    game.init({canvas: chessboard, whitePlayer: p1, blackPlayer: p2, positionFEN: "1k6/2q5/3r4/4r3/8/8/6PP/1K6 w - - 0 1"});

    p1.move("g4"); p2.move("Rb5+"); // check
    expect(chessboard.positionFEN).toBe("1k6/2q5/3r4/1r6/6P1/8/7P/1K6 w - - 1 2");
   
    p1.move("Ka1"); p2.move("Qa7#"); // mate
    expect(chessboard.positionFEN).toBe("1k6/q7/3r4/1r6/6P1/8/7P/K7 w - - 3 3");

    p1.move("h4"); // invalid move
    expect(chessboard.positionFEN).toBe("1k6/q7/3r4/1r6/6P1/8/7P/K7 w - - 3 3");
});


test("Castling test.", () => {
    const game = new Game();
    const chessboard = new Chessboard();
    const p1 = new TestPlayer();
    const p2 = new TestPlayer();
    game.init({canvas: chessboard, whitePlayer: p1, blackPlayer: p2, positionFEN: "r3k2r/ppp1p1pp/3q4/3p1p2/3P1P2/2PQP3/PP4PP/RN2K2R w KQkq - 0 1"});

    p1.move("O-O"); // kingside castling 
    expect(chessboard.positionFEN).toBe("r3k2r/ppp1p1pp/3q4/3p1p2/3P1P2/2PQP3/PP4PP/RN3RK1 b kq - 1 1");

    p1.move("g3"); // invalid move
    expect(chessboard.positionFEN).toBe("r3k2r/ppp1p1pp/3q4/3p1p2/3P1P2/2PQP3/PP4PP/RN3RK1 b kq - 1 1");

    p2.move("O-O-O"); // queenside castling
    expect(chessboard.positionFEN).toBe("2kr3r/ppp1p1pp/3q4/3p1p2/3P1P2/2PQP3/PP4PP/RN3RK1 w - - 2 2");

    p1.move("Ra5"); // invalid move
    expect(chessboard.positionFEN).toBe("2kr3r/ppp1p1pp/3q4/3p1p2/3P1P2/2PQP3/PP4PP/RN3RK1 w - - 2 2");
});


test("En passant test.", () => {
    const game = new Game();
    const chessboard = new Chessboard();
    const p1 = new TestPlayer();
    const p2 = new TestPlayer();
    game.init({canvas: chessboard, whitePlayer: p1, blackPlayer: p2});

    p1.move("e4"); p2.move("d5");
    p1.move("e5"); p2.move("f5");
    p1.move("exf6"); // en passant
    expect(chessboard.positionFEN).toBe("rnbqkbnr/ppp1p1pp/5P2/3p4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 3");
    p2.move("d4");
    p1.move("d3"); p2.move("exf6");
    p1.move("c4"); p2.move ("dxc3"); // en passant
    expect(chessboard.positionFEN).toBe("rnbqkbnr/ppp3pp/5p2/8/8/2pP4/PP3PPP/RNBQKBNR w KQkq - 0 6");
});


test("Promotion test.", () => {
    const game = new Game();
    const chessboard = new Chessboard();
    const p1 = new TestPlayer();
    const p2 = new TestPlayer();
    game.init({canvas: chessboard, whitePlayer: p1, blackPlayer: p2, positionFEN: "8/4PPPP/k7/8/8/K7/4pppp/8 w - - 0 1"});

    p1.move("h8=Q")
    expect(chessboard.positionFEN).toBe("7Q/4PPP1/k7/8/8/K7/4pppp/8 b - - 0 1");
    p2.move("h1=Q")
    expect(chessboard.positionFEN).toBe("7Q/4PPP1/k7/8/8/K7/4ppp1/7q w - - 0 2");

    p1.move("g8=N")
    expect(chessboard.positionFEN).toBe("6NQ/4PP2/k7/8/8/K7/4ppp1/7q b - - 0 2");
    p2.move("g1=N")
    expect(chessboard.positionFEN).toBe("6NQ/4PP2/k7/8/8/K7/4pp2/6nq w - - 0 3");

    p1.move("f8=R")
    expect(chessboard.positionFEN).toBe("5RNQ/4P3/k7/8/8/K7/4pp2/6nq b - - 0 3");
    p2.move("e1=R")
    expect(chessboard.positionFEN).toBe("5RNQ/4P3/k7/8/8/K7/4p3/5rnq w - - 0 4");

    p1.move("e8=B")
    expect(chessboard.positionFEN).toBe("4BRNQ/8/k7/8/8/K7/4p3/5rnq b - - 0 4");
    p2.move("e1=B")
    expect(chessboard.positionFEN).toBe("4BRNQ/8/k7/8/8/K7/8/4brnq w - - 0 5");
});


test("Complex game test 1.", () => {
    const game = new Game();
    const chessboard = new Chessboard();
    const p1 = new TestPlayer();
    const p2 = new TestPlayer();
    game.init({canvas: chessboard, whitePlayer: p1, blackPlayer: p2});
    
    p1.move("e4"); p2.move("d5");
    p1.move("exd5"); p2.move("Nf6");
    p1.move("d4"); p2.move("Nxd5");
    p1.move("c4"); p2.move("Nb6");
    p1.move("Nc3"); p2.move("g6");
    p1.move("Be3"); p2.move("Bg7");
    p1.move("h3"); p2.move("O-O");
    p1.move("Qd2"); p2.move("Nc6");
    p1.move("Nf3"); p2.move("e5");
    p1.move("d5"); p2.move("Ne7");
    p1.move("g4"); p2.move("f5");
    p1.move("O-O-O"); p2.move("e4");
    p1.move("Ng5"); p2.move("h6");
    p1.move("Ne6"); p2.move("Bxe6");
    p1.move("dxe6"); p2.move("Qxd2+");
    p1.move("Rxd2"); p2.move("Rad8");
    p1.move("Bc5"); p2.move("Rxd2");
    p1.move("Kxd2"); p2.move("Rd8+");
    p1.move("Kc2"); p2.move("Nc6");
    p1.move("gxf5"); p2.move("Nd4+");
    p1.move("Bxd4"); p2.move("Rxd4 ");
    p1.move("Rg1"); p2.move("g5");
    p1.move("c5"); p2.move("Nc4");
    p1.move("Bxc4"); p2.move("Rxc4");
    p1.move("Rd1"); p2.move("Bf6");
    p1.move("Kb3"); p2.move("Rxc5");
    p1.move("Nxe4"); p2.move("Rxf5");
    p1.move("Nxf6+"); p2.move("Kf8");
    p1.move("Ng4"); p2.move("h5");
    p1.move("Ne3"); p2.move("Rf3");
    p1.move("Rd5"); p2.move("g4");
    p1.move("hxg4");
    expect(chessboard.positionFEN).toBe("5k2/ppp5/4P3/3R3p/6P1/1K2Nr2/PP3P2/8 b - - 0 32");
});


test("Complex game test 2.", () => {
    const game = new Game();
    const chessboard = new Chessboard();
    const p1 = new TestPlayer();
    const p2 = new TestPlayer();
    game.init({canvas: chessboard, whitePlayer: p1, blackPlayer: p2});

    p1.move("d4"); p2.move("Nf6");
    p1.move("c4"); p2.move("e6");
    p1.move("Nc3"); p2.move("Bb4");
    p1.move("Qc2"); p2.move("c5");
    p1.move("a3"); p2.move("Qa5");
    p1.move("dxc5"); p2.move("Bxc5");
    p1.move("Bd2"); p2.move("Qc7");
    p1.move("e3"); p2.move("a6");
    p1.move("b4"); p2.move("Ba7");
    p1.move("Rc1"); p2.move("Nc6");
    p1.move("Nf3"); p2.move("Ne5");
    p1.move("Nxe5"); p2.move("Qxe5");
    p1.move("Bd3"); p2.move("d6");
    p1.move("Ne2"); p2.move("Bd7");
    p1.move("O-O"); p2.move("Ng4");
    p1.move("Ng3"); p2.move("h5");
    p1.move("h3"); p2.move("h4");
    p1.move("Bc3"); p2.move("Nxe3");
    p1.move("Qe2"); p2.move("Qg5");
    p1.move("Kh1"); p2.move("Nxf1");
    expect(chessboard.positionFEN).toBe("r3k2r/bp1b1pp1/p2pp3/6q1/1PP4p/P1BB2NP/4QPP1/2R2n1K w kq - 0 21");
});
