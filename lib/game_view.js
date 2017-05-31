import Game from './game.js';
import * as Utils from './utils';

class GameView {
    constructor(ctx) {
        this.ctx = ctx;
        this.game = new Game;
    }

    start() {
        const gameInterval = setInterval( () => {
            this.ctx.clearRect(0, 0, 800, 800);
            this.game.moveObjects();
            this.game.draw(this.ctx);
            if(!this.game.spaceShip && this.game.explosions.length === 0) {
                clearInterval(gameInterval);
                clearInterval(makeAsteroids);
            }
        }, 40);

        const makeAsteroids = setInterval( () => {
            const pos = Utils.randEdge();
            this.game.generateOffscreenElement({
                x: pos.x * this.game.DIM_X,
                y: pos.y * this.game.DIM_Y
            }, 'asteroid');
        }, 1000);
    }
}

export default GameView;