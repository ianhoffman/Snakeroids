import Game from './game.js';
import * as Utils from './utils';
import AudioBuilder from './audio_builder';

class GameView {
    constructor(canvas, audioBuilder) {
        this.game = new Game(audioBuilder);
        this.audioBuilder = audioBuilder;

        this.ctx = canvas.getContext('2d');
        canvas.webkitImageSmoothingEnabled = false;
        canvas.mozImageSmoothingEnabled = false;
        canvas.imageSmoothingEnabled = false;

        this.gameOverMessage = this.gameOverMessage.bind(this);
        this.renderScore = this.renderScore.bind(this);
        this.start = this.start.bind(this);

        this.gameInterval = null;
        this.makeAsteroids = null;
    }

    start() {
        this.renderScore();

        clearInterval(this.gameInterval);
        clearInterval(this.makeAsteroids);

        this.gameInterval = setInterval( () => {
            this.ctx.clearRect(0, 0, 800, 800);
            this.game.moveObjects();
            this.game.draw(this.ctx);
            if(!this.game.spaceShip && this.game.explosions.length === 0) {
                this.gameOverMessage(false);
                clearInterval(this.gameInterval);
                clearInterval(this.makeAsteroids);
                // debugger
                // document.body.removeChild(this.game.audioBuilder.backgroundMusic);
            } 
            if(this.game.spaceShip && this.game.spaceShip.sourceCount === 10) {
                this.gameOverMessage(true);
                clearInterval(this.gameInterval);
                clearInterval(this.makeAsteroids);
                // document.body.removeChild(this.game.audioBuilder.backgroundMusic);
            }
        }, 40);

        this.makeAsteroids = setInterval( () => {
            const pos = Utils.randEdge();
            this.game.generateOffscreenElement({
                x: pos.x * this.game.DIM_X,
                y: pos.y * this.game.DIM_Y
            }, 'asteroid');
        }, 1000 - (this.game.spaceShip.sourceCount * 75));
    }

    renderScore() { 
        const scoreBar = document.createElement('div');
        scoreBar.className = 'score-bar';
        document.querySelector('main').appendChild(scoreBar);

        const currScore = document.createElement('span');
        scoreBar.appendChild(currScore);
        currScore.id = 'score';
        currScore.innerHTML = '0';
        
        const powerSourceIcon = document.createElement('img');
        scoreBar.appendChild(powerSourceIcon);
        powerSourceIcon.src = 'sprites/power_source_icon.png';
    }

    gameOverMessage(won) {
        const text = won ? 'You win!' : 'Game over...';

        const gameOverModal = document.getElementById('game-over');
        document.querySelectorAll('#game-over h3')[0].innerHTML = text;
        gameOverModal.style.display = 'flex';
        document.getElementById('start-button').addEventListener('click', e => {
            e.preventDefault();
            e.target.parentElement.style.display = 'none';
            this.game = new Game(this.audioBuilder);
            this.start();
        });
    }
}

export default GameView;