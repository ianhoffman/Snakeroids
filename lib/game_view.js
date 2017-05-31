import Game from './game.js';
import * as Utils from './utils';

class GameView {
    constructor(ctx) {
        this.ctx = ctx;
        this.game = new Game;
        this.gameOverMessage = this.gameOverMessage.bind(this);
        this.renderScore = this.renderScore.bind(this);
    }

    start() {
        this.renderScore();

        const gameInterval = setInterval( () => {
            this.ctx.clearRect(0, 0, 800, 800);
            this.game.moveObjects();
            this.game.draw(this.ctx);
            if(!this.game.spaceShip) {
                clearInterval(gameInterval);
                clearInterval(makeAsteroids);
                this.game.spaceShip.unregisterListeners();
                this.gameOverMessage(false);
            } 
            // if(!this.game.spaceShip && this.game.explosions.length === 0) {
            //     clearInterval(gameInterval);
            //     clearInterval(makeAsteroids);
            //     this.gameOverMessage(false);
            // } 
            if(this.game.spaceShip.sourceCount === 5) {
                clearInterval(gameInterval);
                clearInterval(makeAsteroids);
                this.game.spaceShip.unregisterListeners();
                this.gameOverMessage(true);
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

    renderScore() { 
        const scoreBar = document.createElement('div');
        scoreBar.className = 'score-bar';
        document.body.appendChild(scoreBar);

        const currScore = document.createElement('span');
        scoreBar.appendChild(currScore);
        currScore.id = 'score';
        currScore.innerHTML = '0';
        
        const powerSourceIcon = document.createElement('img');
        scoreBar.appendChild(powerSourceIcon);
        powerSourceIcon.src = 'sprites/power_source_icon.png';
    }

    gameOverMessage(won) {
        const text = won ? 'Congratulations!' : 'Game over...';

        const gameOverModalContainer = document.createElement('div');
        const gameOverModal = document.createElement('div');
        const gameOverText = document.createElement('p');
        document.body.appendChild(gameOverModalContainer);
        gameOverModalContainer.className = 'game-over-modal-container';
        gameOverModalContainer.appendChild(gameOverModal);
        gameOverModal.className = 'game-over-modal';
        gameOverModal.appendChild(gameOverText);
        gameOverText.innerHTML = text;

        if (!won) {
            const playAgain = document.createElement('button');
            gameOverModal.appendChild(playAgain);
            playAgain.innerHTML = 'Play again?';
            playAgain.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.removeChild(gameOverModalContainer);
                this.game = new Game(this.ctx);
                this.start();
            });
        }
    }
}

export default GameView;