/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sprite {
    constructor(props) {
        this.img = new Image();
        this.img.src = props.imageSrc;

        this.frameRate = props.frameRate;
        this.currFrame = 0;
        this.currCol = 0;
        this.currRow = 0;

        this.x = props.dimensions.x;
        this.y = props.dimensions.y;
        this.width = props.dimensions.width;
        this.height = props.dimensions.height; 

        this.center = {
            x: props.pos.x + (this.width / 2),
            y: props.pos.y + (this.height / 2)
        };

        this.radius = Math.sqrt(
            Math.pow((this.center.x - props.pos.x), 2) 
            + Math.pow((this.center.y - props.pos.y), 2));

        this.angle = props.angle;
        this.speed = props.speed;

        this.loaded = false;   
        this.onLoad = this.onLoad.bind(this);
        this.img.addEventListener('load', this.onLoad);

        this.render = this.render.bind(this);
        this.move = this.move.bind(this);
        this.update = this.update.bind(this);
    }

    onLoad() {
        this.loaded = true;
        this.numColumns = Math.floor(this.img.width / this.width);
        this.numRows = Math.floor(this.img.height / this.height);
    }

    move() {
        this.center.x += this.speed * Math.sin(this.angle);
        this.center.y -= this.speed * Math.cos(this.angle);

        //don't allow ship to move offscreen
        if(this.type === 'spaceship') {
            if(this.center.x - this.radius < 0 || this.center.x + this.radius > this.game.DIM_X) {
                this.center.x -= this.speed * Math.sin(this.angle);
            }
            if(this.center.y - this.radius < 0 || this.center.y + this.radius > this.game.DIM_Y) {
                this.center.y += this.speed * Math.cos(this.angle);
            }
        }
    }

    render(ctx) {
        ctx.save();
        ctx.translate(
            this.center.x, 
            this.center.y
        );
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.img,
            (this.currCol * this.width) + this.x,
            (this.currRow * this.height) + this.y,
            this.width,
            this.height,
            this.x - (this.width / 2),
            this.y - (this.height / 2),
            this.width,
            this.height
        );

        ctx.restore();
        this.update();
    }

    update() {
        if(this.currFrame === this.frameRate) {
            this.currCol += 1;
            this.currFrame = 0;
        } else {
            this.currFrame += 1;
        }

        if(this.currCol === this.numColumns) {
            this.currCol = 0;
            this.currRow += 1;
        }

        if(this.currRow === this.numRows ) {
            this.currRow = 0;
        }
    }

    isCollidedWith(sprite) {
        if(this.center.x < sprite.center.x + sprite.radius &&
            this.center.x > sprite.center.x - sprite.radius &&
            this.center.y < sprite.center.y + sprite.radius &&
            this.center.y > sprite.center.y - sprite.radius
        ) {
            return true;
        }
        return false;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const randDirection = () => (
    Math.random() < .5 ? -1 : 1
);
/* unused harmony export randDirection */


const randEdge = () => {
    const x = Math.random() < .5 ? 0 : 1;
    const y = Math.random() < .5 ? 0 : 1;
    return {x: x, y: y};
};
/* harmony export (immutable) */ __webpack_exports__["a"] = randEdge;


const randAngle = () => {
    return (Math.random() * Math.PI);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = randAngle;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AudioBuilder {
  constructor() {
    this.volume = .5;
    this.createAudio = this.createAudio.bind(this);
    this.createBackgroundMusic = this.createBackgroundMusic.bind(this);
    this.backgroundMusic = this.createBackgroundMusic();
    this.backgroundMusic.play();

    document.getElementsByClassName('fa')[0].addEventListener('click', e => {
      e.preventDefault();
      if(this.volume === 0) {
        this.volume = .2;
        this.backgroundMusic.volume = .7;
        e.target.classList.remove('fa-volume-off');
        e.target.classList.add('fa-volume-up');
      } else {
        this.volume = 0;
        this.backgroundMusic.volume = 0;
        e.target.classList.remove('fa-volume-up');
        e.target.classList.add('fa-volume-off');
      }
    });
  }

  createAudio(src, playbackRate) {
    const audio = document.createElement('audio');
    audio.src = src;
    if(playbackRate) {
      audio.playbackRate = playbackRate;
    }
    document.body.appendChild(audio);
    audio.volume = this.volume;
    audio.onended = () => document.body.removeChild(audio);
    return audio;
  }

  createBackgroundMusic(src) {
    this.backgroundMusic = document.createElement('audio');
    this.backgroundMusic.src = 'sounds/background-music.mp3';
    this.backgroundMusic.volume = .5;
    // document.body.appendChild(this.backgroundMusic);
    this.backgroundMusic.onended = () => this.backgroundMusic.play();
    return this.backgroundMusic;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AudioBuilder);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_builder__ = __webpack_require__(2);




class GameView {
    constructor(canvas, audioBuilder) {
        this.game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](canvas, audioBuilder);
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
            this.game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](this.canvas, this.audioBuilder);
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
            let pos = __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* randEdge */]();
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
            this.game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */](this.canvas, this.audioBuilder);
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

/* harmony default export */ __webpack_exports__["a"] = (GameView);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_game_view_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_audio_builder_js__ = __webpack_require__(2);



let firstEnter = true;

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const audioBuilder = new __WEBPACK_IMPORTED_MODULE_1__lib_audio_builder_js__["a" /* default */]();

    const githubLinks = document.querySelectorAll('.fa-github');
    for(let i = 0; i < githubLinks.length; i++) {
        githubLinks[i].addEventListener('click', e => {
            window.location = 'https://github.com/ianhoffman/SpaceExplorer';
        });
    }
    
    const linkedinLinks = document.querySelectorAll('.fa-linkedin');
    for(let j = 0; j < linkedinLinks.length; j++) {
        linkedinLinks[j].addEventListener('click', e => {
            window.location = 'https://www.linkedin.com/in/hoffmanian/';
        });
    }
    
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }


    window.addEventListener('keypress', e => {
        if(e.keyCode === 13 && firstEnter) {
            showInstructions(document.getElementById('start-button'), canvas, audioBuilder);
        } else if(e.keyCode) {
            showGame(document.getElementById('start-button'), canvas, audioBuilder);
        }
    });

    document.getElementsByClassName('title-container')[0].addEventListener('click', e => {
            e.preventDefault();
            if(e.target.id==='start-button') {
                showInstructions(e.target, canvas, audioBuilder);
            }
    });
});

const showInstructions = (startButton, canvas, audioBuilder) => {
    startButton.id = '';
    firstEnter = false;
    const titleContainer = startButton.parentElement;
    titleContainer.style.display = 'none';
    document.getElementsByClassName('top-links')[0].style.display = 'flex';
    document.getElementById('instructions-container').style.display = 'flex';
    document.getElementById('start-button').addEventListener('click', e2 => {
        e2.preventDefault();
        showGame(e2.target, canvas, audioBuilder);
    });
};

const showGame = (startButton, canvas, audioBuilder) => {
    const game = new __WEBPACK_IMPORTED_MODULE_0__lib_game_view_js__["a" /* default */](canvas, audioBuilder);
    document.getElementById('instructions-container').style.display = 'none';
    startButton.id = '';
    game.start();
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);



class Asteroid extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
    constructor(props) {
        super({
            imageSrc: 'sprites/animated_asteroid.png',
            pos: {
                x: props.x, 
                y: props.y
            },
            dimensions: {
                x: 0,
                width: 35,
                y: 0,
                height: 35
            },
            frameRate: 8,
            
            speed: Math.random() + 1,
            angle: __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* randAngle */]()
        });
        this.type = 'asteroid';
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Asteroid);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * Do not import 'Sprite' because, by default, Sprite uses the pos passed
 * to it as the x, y coords for the upper left corner. This is fine for most 
 * subclasses, as we know their orientation on initialization is true-north.
 * However, bullet's orientation depends on the orientation of the ship, and 
 * therefore it's best to pass it a center, rather than the coord for one of its 
 * corners. This could be something to refactor for all classes, given time. 
 */

class Bullet {
  constructor(props) {
    this.img = new Image();
    this.img.src = 'sprites/beams.png';

    this.x = 0;
    this.y = 0;
    this.width = 17;
    this.height = 20; 

    this.speed = 4;
    this.angle = props.angle;
    this.type = 'bullet';

    this.center = {
      x: props.x,
      y: props.y
    };

    this.radius = Math.sqrt(
      Math.pow((this.width/2), 2) 
      + Math.pow((this.height/2), 2)
    );

    this.loaded = false;   
    this.onLoad = this.onLoad.bind(this);
    this.img.addEventListener('load', this.onLoad);

    // this.audio = document.createElement('audio');
    // this.audio.src = 'sounds/bullet-fired.mp3';
    // this.audio.playRate = 2;
    // document.body.appendChild(this.audio);
    // this.audio.play();
    // this.audio.onended = () => document.body.removeChild(this.audio);
    
    this.render = this.render.bind(this);
  }

  onLoad() {
        this.loaded = true;
  }

  render(ctx) {
        ctx.save();
        ctx.translate(
            this.center.x, 
            this.center.y
        );
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height,
            this.x - (this.width / 2),
            this.y - (this.height / 2),
            this.width,
            this.height
        );

        ctx.restore();
    }

    move() {
      this.center.x += this.speed * Math.sin(this.angle);
      this.center.y -= this.speed * Math.cos(this.angle);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


class Explosion extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(props) {
    super({
      imageSrc: 'sprites/explosions.png',
          pos: {
              x: props.x, 
              y: props.y
          },
          dimensions: {
              x: 0,
              width: 100,
              y: 0,
              height: 100
          },
          frameRate: 0,
          speed: 0,
          angle: 0,
    });
    this.type = 'explosion';
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Explosion);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__asteroid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__space_ship__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__explosion__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__power_source__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);






class Game {
    constructor(canvas, audioBuilder) {
        this.DIM_X = canvas.width;
        this.DIM_Y = canvas.height;
        this.NUM_ASTEROIDS = 0;
        this.NUM_PLANETS = 0;
        this.NUM_POWER_SOURCES = 0;

        this.audioBuilder = audioBuilder;

        this.asteroids = [];
        this.explosions = [];
        this.bullets = [];
        this.spaceShip = new __WEBPACK_IMPORTED_MODULE_1__space_ship__["a" /* default */](
            {
                pos: {
                    x: this.DIM_X / 2,
                    y: this.DIM_Y / 2
                },
                game: this
            });

        this.createInitialView = this.createInitialView.bind(this);
        this.generateRandomPos = this.generateRandomPos.bind(this);
        this.addAsteroid = this.addAsteroid.bind(this);
        this.draw = this.draw.bind(this);
        this.moveObjects = this.moveObjects.bind(this);
        this.generateOffscreenElement = this.generateOffscreenElement.bind(this);
        this.getCollisions = this.getCollisions.bind(this);
        this.handleCollision = this.handleCollision.bind(this);
        this.atEdge = this.atEdge.bind(this);
        this.addBullet = this.addBullet.bind(this);

        this.createInitialView();
    }

    createInitialView() {
        for( let i = 0; i < 5; i ++ ) {
            let pos = this.generateRandomPos();
            while((pos.x < (this.width / 2) + 40 && pos.x > (this.width / 2) - 40) && 
            (pos.y < (this.height / 2) + 40 && pos.y > (this.height / 2) - 40)) {
                pos = this.generateRandomPos();
            }
            this.addAsteroid(pos);
        }
        this.powerSource = new __WEBPACK_IMPORTED_MODULE_3__power_source__["a" /* default */](this.generateRandomPos());
    }

    generateRandomPos() {
        const x = Math.floor(Math.random() * this.DIM_X);
        const y = Math.floor(Math.random() * this.DIM_Y);
        return {x: x, y: y};
    }

    addAsteroid(pos) {
       const asteroid = new __WEBPACK_IMPORTED_MODULE_0__asteroid__["a" /* default */](pos);
       this.asteroids.push(asteroid);
       this.NUM_ASTEROIDS += 1;
    }

    draw(ctx) {
        if(this.powerSource) {
            this.powerSource.render(ctx);
        }

        this.asteroids.forEach(asteroid => {
            if(asteroid.loaded) {  //wait for sprite's onLoad handler
                asteroid.render(ctx);
            }
        });

        this.bullets.forEach(bullet => {
            if(bullet.loaded) {
                bullet.render(ctx);
            }
        });

        this.explosions.forEach((explosion, idx) => {

            if(explosion.loaded) {
                explosion.render(ctx);
            }
            if(explosion.currCol + 1 === explosion.numColumns &&
                explosion.currRow + 1 === explosion.numRows) {
                    this.explosions.splice(idx, 1);
                }
        });

        if(this.spaceShip && this.spaceShip.loaded) {
            this.spaceShip.render(ctx);
        }
    }

    moveObjects() {
        this.bullets.forEach(bullet => bullet.move());
        this.asteroids.forEach(asteroid => asteroid.move());

        if(this.spaceShip) {
            this.spaceShip.turn();
            this.spaceShip.move();
        }

        this.getCollisions();
    }

    generateOffscreenElement(pos, className) {
        let x, y;
        
        /* 
         * coinflips determines on which axis to render 
         * movingObject if spaceShip is headed toward a corner
         */ 
        const coinFlip = Math.random();

        if(pos.x <= 0 && pos.y > 0) {
            y = Math.random() * this.DIM_Y;
            x = 0;
        } else if(pos.y === 0 && pos.x > 0) {
            x = Math.random() * this.DIM_X;
            y = 0;
        } else if(pos.x >= this.DIM_X && pos.y < this.DIM_Y) {
            y = Math.random() * this.DIM_Y;
            x = this.DIM_X;
        } else if(pos.y >= this.DIM_Y && pos.x < this.DIM_X) {
            x = Math.random() * this.DIM_X;
            y = this.DIM_Y;

        } else if(pos.x <= 0 && pos.y <= 0) {
            if(coinFlip < .5) {
                x = Math.random() * this.DIM_X;
                y = 0;
            } else {
                y = Math.random() * this.DIM_Y;
                x = 0;
            }
        } else if(pos.x >= this.DIM_X && pos.y <= 0) {
            if(coinFlip < .5) {
                x = Math.random() * this.DIM_X;
                y = 0;
            } else {
                y = Math.random() * this.DIM_Y;
                x = this.DIM_X;
            }
        } else if(pos.x >= this.DIM_X && pos.y >= this.DIM_Y) {
            if(coinFlip < .5) {
                x = Math.random() * this.DIM_X;
                y = this.DIM_Y;
            } else {
                y = Math.random() * this.DIM_Y;
                x = this.DIM_X;
            }
        } else if(pos.x <= 0 && pos.y >= this.DIM_Y) {
            if(coinFlip < .5) {
                x = Math.random() * this.DIM_X;
                y = this.DIM_Y;
            } else {
                y = Math.random() * this.DIM_Y;
                x = 0;
            }
        }

        const newPos = {x: x, y: y}; 

        switch(className) {
            case 'asteroid': 
                this.addAsteroid(newPos);
        }
    }

    getCollisions() {
        for(let i = 0; i < this.asteroids.length; i++ ) {
            let currAsteroid = this.asteroids[i];
            if(this.spaceShip) {
                if(this.spaceShip.isCollidedWith(currAsteroid)) {
                    this.handleCollision(this.spaceShip, currAsteroid, i);
                }
            }

            for(let j = 0; j < this.asteroids.length; j++ ) {
                if(i !== j) {
                    if(currAsteroid.isCollidedWith(this.asteroids[j])) {
                        this.handleCollision(currAsteroid, this.asteroids[j]);
                    }
                }
            }

            for(let k = 0; k < this.bullets.length; k++ ) {
                if(currAsteroid.isCollidedWith(this.bullets[k])) {
                    this.handleCollision(currAsteroid, this.bullets[k], i, k);
                }
            }
        }

        if(this.spaceShip && this.spaceShip.isCollidedWith(this.powerSource)) {
            this.handleCollision(this.spaceShip, this.powerSource);
        }
    }

    handleCollision(obj1, obj2, idx, jdx) {
        if(this.spaceShip) {
            if(obj1.type === 'spaceship' && obj2.type === 'asteroid') {
                if(obj1.shieldsUp) {
                    obj1.shieldsUp = false;
                    this.explosions.push(new __WEBPACK_IMPORTED_MODULE_2__explosion__["a" /* default */]({
                        x: obj2.center.x - 45,
                        y: obj2.center.y - 45
                    }));
                    this.spaceShip.statusBar.style.display = 'none';
                    this.asteroids.splice(idx, 1);
                } else {
                    this.explosions.push(new __WEBPACK_IMPORTED_MODULE_2__explosion__["a" /* default */]({
                        x: this.spaceShip.center.x - 45,
                        y: this.spaceShip.center.y - 45
                    }));
                    this.spaceShip.unregisterListeners();
                    this.audioBuilder.createAudio('sounds/spaceship-destroyed.mp3', .5).play();
                    this.spaceShip = null;
                }
            }
            if(obj1.type === 'spaceship' && obj2.type === 'powersource') {
                this.powerSource.teleport(this.DIM_X, this.DIM_Y);
                while(this.atEdge(this.powerSource)) {
                    this.powerSource.teleport(this.DIM_X, this.DIM_Y);
                }
                this.spaceShip.registerPoint();
                this.audioBuilder.createAudio('sounds/power-source-collected.mp3', .5).play();
            }
        }

        if(obj1.type === 'asteroid' && obj2.type === 'bullet') {
            this.explosions.push(new __WEBPACK_IMPORTED_MODULE_2__explosion__["a" /* default */]({
                x: obj1.center.x - 45,
                y: obj2.center.y - 45
            }));
            this.audioBuilder.createAudio('sounds/asteroid-destroyed.mp3', .5).play();
            this.asteroids.splice(idx, 1);
            this.bullets.splice(jdx, 1);
        }
    }

    atEdge(sprite) {
        if((sprite.center.x < 40 || sprite.center.x > this.DIM_X - 40) ||
        (sprite.center.y < 40 || sprite.center.y > this.DIM_Y - 40)) {
            return true;
        }
        return false;
    }

    addBullet(bullet) {
        this.bullets.push(bullet);
        this.audioBuilder.createAudio('sounds/bullet-fired.mp3', 2).play();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);


class PowerSource extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(props) {
    super({
      imageSrc: 'sprites/power_source.png',
      pos: {
          x: props.x, 
          y: props.y
      },
      dimensions: {
          x: 0,
          width: 46,
          y: 0,
          height: 42
      },
      frameRate: 2,
      speed: 0,
      angle: 0
    });
    this.type = 'powersource';
  }

  teleport(width, height) {
    this.center.x = Math.random() * width;
    this.center.y = Math.random() * height;
  }

  
}

/* harmony default export */ __webpack_exports__["a"] = (PowerSource);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(6);



class SpaceShip extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {

    constructor(props) {
        super({
            imageSrc: 'sprites/spaceship.png',
            pos: {
                x: props.pos.x,
                y: props.pos.y
            },
            dimensions: {
                x: 0,
                width: 37,
                y: 0,
                height: 51
            },
            frameRate: 0,

            speed: 0,
            angle: 0
        });
        this.moveAngle = 0;
        this.fwdSpeed = 3;
        this.turnSpeed = 3;
        this.bckSpeed = -2;

        this.firePause = 35;
        this.bulletQueued = false;
        this.fireCountdown = 0;

        this.type = 'spaceship';
        this.sourceCount = 0;
        this.game = props.game;
        this.shieldIteration = 0;
        this.shieldsUp = false;
        this.statusInterval = 0;

        this.statusBar = document.getElementById('status-bar');
        this.status = document.getElementById('status');

        this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        this.unregisterListeners = this.unregisterListeners.bind(this);
        this.registerKeyHandlers();

        this.fireBullet = this.fireBullet.bind(this);
    }

    registerKeyHandlers() {
        this.keydownListener = window.addEventListener('keydown', e => {
            e.preventDefault();
            if(e.keyCode === 87) {
                this.speed = this.fwdSpeed;
            } 
            if(e.keyCode === 83) {
                this.speed = this.bckSpeed;
            }
            if(e.keyCode === 65) {
                this.moveAngle = (this.turnSpeed * -1);
            }
            if(e.keyCode === 68) {
                this.moveAngle = this.turnSpeed;
            }
            if(e.keyCode === 32 && this.fireCountdown === 0) {
                this.fireBullet();
                this.fireCountdown = this.firePause;
            } else if(e.keyCode === 32 && this.fireCountdown > 0 && !this.bulletQueued) {
                this.bulletQueued = true;
            }
        });

        this.keyupListener = window.addEventListener('keyup', (e) => {
            e.preventDefault();
            if(e.keyCode === 87) {
                this.speed = 0;
            } 
            if(e.keyCode === 83) {
                this.speed = 0;
            }
            if(e.keyCode === 65) {
                this.moveAngle = 0;
            }
            if(e.keyCode === 68) {
                this.moveAngle = 0;
            }
        });
    }

    render(ctx) {

        if(this.fireCountdown > 0) {
            this.fireCountdown -= 1;
        }
        
        else if(this.fireCountdown === 0 && this.bulletQueued) {
            this.fireBullet();
            this.bulletQueued = false;
            this.fireCountdown = this.firePause;
        }

        if(this.statusInterval > 0) {
            this.statusInterval -= 1;
        }

        if(this.statusInterval === 0) {
            this.shieldsUp = false;
            this.turnSpeed = 3;
            this.fwdSpeed = 3;
            this.bckSpeed = -2;
            this.firePause = 35;
            if(this.statusBar.style.display === 'block') {
                this.statusBar.style.display = 'none';
            }
        }

        if(this.shieldsUp) {
            if(this.shieldIteration % 2 === 0) {
                ctx.beginPath();
                ctx.arc(
                    this.center.x,
                    this.center.y,
                    this.radius,
                    0, 
                    2 * Math.PI
                );
                ctx.strokeStyle = 'teal';
                ctx.lineWidth = 3;
                ctx.setLineDash([1, 2]);
                ctx.stroke();
            } 
            this.shieldIteration += 1;
        }

        super.render(ctx);
        
        if(this.sourceCount >= 4) {

        }
    }

    unregisterListeners() {
        document.removeEventListener('keydown', this.keydownListener);
        document.removeEventListener('keyup', this.keyupListener);
    }

    turn() {
        this.angle += this.moveAngle * Math.PI / 180;
    }

    registerPoint() {
        this.sourceCount += 1;
        document.getElementById('score').innerHTML = this.sourceCount;
        this.statusBar.style.display = 'block';

        const rand = Math.random();

        this.shieldsUp = false;
        this.moveAngle = 0;
        this.fwdSpeed = 3;
        this.turnSpeed = 3;
        this.bckSpeed = -2;
        this.firePause = 35;

        if(rand < .25) {
            this.turnSpeed *= 2;
            this.status.innerHTML = 'Extra Torque';
            this.statusInterval = 250;
        }
        if(rand >= .25 && rand < .5) {
            this.fwdSpeed *= 2;
            this.bckSpeed *= 2;
            this.status.innerHTML = 'Warspeed';
            this.statusInterval = 250;
        }
        if(rand >= .5 && rand < .75) {
            this.shieldsUp = true;
            this.status.innerHTML = 'Shields Up';
            this.statusInterval = 250;
        }
        if(rand >= .75 && rand < 1) {
            this.firePause = 1;
            this.status.innerHTML = 'Rapid Fire';
            this.statusInterval = 250;
        }
    }

    fireBullet() {
        const x = this.center.x + (Math.sin(this.angle) * this.radius);
        const y = this.center.y - (Math.cos(this.angle) * this.radius);

        const bullet = new __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */]({
            x: x,
            y: y
        });

        bullet.angle = this.angle;
        this.game.addBullet(bullet);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (SpaceShip);

/***/ })
/******/ ]);