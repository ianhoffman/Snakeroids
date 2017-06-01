import Game from './game.js';
import * as Utils from './utils';
import AudioBuilder from './audio_builder';

class GameView {
    constructor(canvas, audioBuilder) {
        this.game = new Game(canvas, audioBuilder);
        this.audioBuilder = audioBuilder;
        this.canvas = canvas;

        this.ctx = canvas.getContext('2d');
        canvas.webkitImageSmoothingEnabled = false;
        canvas.mozImageSmoothingEnabled = false;
        canvas.imageSmoothingEnabled = false;

        this.animate = this.animate.bind(this);

        this.gameOverMessage = this.gameOverMessage.bind(this);
        this.renderScore = this.renderScore.bind(this);
        this.start = this.start.bind(this);

        this.handleStart = this.handleStart.bind(this);

        this.now = null;
        this.then = null;
        this.myReq = null;

        document.getElementById('play-again').addEventListener('click', e => {
            e.preventDefault();
            e.target.parentElement.style.display = 'none';
            document.getElementById('score').innerHTML = '0';
            this.game = new Game(this.canvas, this.audioBuilder);
            this.start();
        });

        this.gameInterval = null;
        this.makeAsteroids = null;
        this.renderScore();
    }

    animate(timestamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.game.moveObjects();
        this.game.draw(this.ctx);
        this.now = timestamp;
        if(!this.then) this.then = timestamp;
        
        if(this.game.spaceShip && 
            this.now - this.then > 500 - (this.game.spaceShip.sourceCount * 50)) {
            let pos = Utils.randEdge();
            this.game.generateOffscreenElement({
                x: pos.x * this.game.DIM_X,
                y: pos.y * this.game.DIM_Y
            }, 'asteroid');
            this.then = timestamp;
        }
        
        if(!this.game.spaceShip && this.game.explosions.length === 0) {
            this.gameOverMessage(false);
            cancelAnimationFrame(this.myReq);
            this.then = null;
            this.now = null;
        } 
        else if(this.game.spaceShip && this.game.spaceShip.sourceCount === 20) {
            this.gameOverMessage(true);
            cancelAnimationFrame(this.myReq);
            this.then = null;
            this.now = null;
        } 
        else {
            this.myReq = requestAnimationFrame(this.animate);
        }
    }


    start() {
        this.myReq = requestAnimationFrame(this.animate);
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

    handleStart(text) {
        this.startCallback = (e) => {
            e.preventDefault();
            document.removeEventListener('click', this.startCallback);
            e.target.parentElement.style.display = 'none';
            document.getElementById('score').innerHTML = '0';
            this.game = new Game(this.canvas, this.audioBuilder);
            this.start();
        };
        return this.startCallback;
    }

    gameOverMessage(won) {
        const text = won ? 'You win!' : 'Game over...';

        const gameOverModal = document.getElementById('game-over');
        document.querySelectorAll('#game-over h3')[0].innerHTML = text;
        gameOverModal.style.display = 'flex';
    }
}

export default GameView;