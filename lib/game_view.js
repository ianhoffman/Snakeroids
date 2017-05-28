import Game from './game.js';

class GameView {
    constructor(ctx) {
        this.ctx = ctx;
        this.game = new Game();
    }

    start() {
        this.game.draw(this.ctx);
    }
}

export default GameView;