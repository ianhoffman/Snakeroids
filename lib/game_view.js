import Game from './game.js';
import * as Utils from './utils';

class GameView {
    constructor(ctx) {
        this.ctx = ctx;
        this.game = new Game();
    }

    start() {
        setInterval( () => {
            this.ctx.clearRect(0, 0, 800, 800);
            this.game.moveObjects();
            this.game.draw(this.ctx);
        }, 10);

        setInterval( () => {
            const pos = Utils.randEdge();
            this.game.generateOffscreenElement({
                x: pos.x * this.game.DIM_X,
                y: pos.y * this.game.DIM_Y
            }, 'asteroid');
        }, 100);
    }
}

export default GameView;