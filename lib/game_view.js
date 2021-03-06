import Game from './game.js';
import * as Utils from './utils';
import AudioBuilder from './audio_builder';

// make sure we use the browser-specific version
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

class GameView {
    constructor(canvas, audioBuilder) {
        this.game = new Game(canvas, audioBuilder);
        this.audioBuilder = audioBuilder;
        this.canvas = canvas;

        this.ctx = canvas.getContext('2d');
        canvas.webkitImageSmoothingEnabled = false;
        canvas.mozImageSmoothingEnabled = false;
        canvas.imageSmoothingEnabled = false;

        //handle animation
        this.animate = this.animate.bind(this);
        this.fps = 15;
        this.now = null;
        this.then = null;
        this.delta = null;
        this.myReq = null;
        this.interval = 1000 / this.fps;
        this.asteroidInterval = 1000;
        this.lastAsteroid = null;

        this.countToGameOver = null;
        this.gameOverMessage = this.gameOverMessage.bind(this);
        this.renderScore = this.renderScore.bind(this);
        this.start = this.start.bind(this);
        this.handleStart = this.handleStart.bind(this);

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


        // handle pausing / unpausing
        this.handlePauses = this.handlePauses.bind(this);
        this.handlePauses();
    }

    animate(timestamp) {
        if(!this.paused) {
            this.now = Date.now();
            this.delta = this.now - this.then;
            if(this.delta > this.interval) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.game.moveObjects();
                this.game.draw(this.ctx);
                this.then = this.now - (this.delta % this.interval);
            }
            
            if(this.game.spaceShip && 
                this.now - this.lastAsteroid > 825 - (this.game.spaceShip.sourceCount * 27)) {
                let pos = Utils.randEdge();
                this.game.generateOffscreenElement({
                    x: pos.x * this.game.DIM_X,
                    y: pos.y * this.game.DIM_Y
                }, 'asteroid');
                this.lastAsteroid = this.now;
            }
            
            if(!this.game.spaceShip && !this.countToGameOver) {
                this.countToGameOver = 60;
                this.myReq = window.requestAnimFrame(this.animate);
            } 
            else if(!this.game.spaceShip) {
                this.countToGameOver -= 1;
                if(this.countToGameOver === 0) {
                    this.gameOverMessage(false);
                    cancelAnimationFrame(this.myReq);
                    this.then = null;
                    this.now = null;
                    this.countToGameOver = null;
                } else {
                    this.myReq = window.requestAnimFrame(this.animate);
                }
            }
            else {
                this.myReq = window.requestAnimFrame(this.animate);
            }
        }
    }


    start() {
        this.myReq = window.requestAnimFrame(this.animate);
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

    renderInstructions(e) {
        e.preventDefault();
        this.paused = true;
        const titleContainer = document.getElementById('instructions-container');
        titleContainer.style.display = 'flex';
        const startButton = document.getElementById('start-button');
        startButton.innerHTML = 'resume';

        if (this.instructionsClicked === false) {
            this.instructionsClicked = true;
            startButton.addEventListener('click', e2 => {
                this.paused = false;
                const newStart = startButton.cloneNode();
                startButton.parentElement.replaceChild(newStart, startButton);
                this.instructionsClicked = false;
                titleContainer.style.display = 'none';
                this.myReq = window.requestAnimFrame(this.animate);
            });
        }
    }

    handlePauses() {
        this.renderInstructions = this.renderInstructions.bind(this);
        this.paused = false;
        this.instructionsClicked = false; // prevent double clicks
        document.getElementsByClassName('fa-info-circle')[0].addEventListener('click', e => {
            this.paused = true;
            this.renderInstructions(e);
        });
        document.getElementsByClassName('fa-pause')[0].addEventListener('click', e => {
            if(!this.paused) {
                this.paused = true;
            } else if(this.paused && !this.instructionsClicked) {
                this.paused = false;
                window.requestAnimFrame(this.animate);
            }
        });
    }
}

export default GameView;