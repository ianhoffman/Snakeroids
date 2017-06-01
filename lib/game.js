import Asteroid from './asteroid';
import SpaceShip from './space_ship';
import Explosion from './explosion';
import PowerSource from './power_source';
import * as Utils from './utils';

class Game {
    constructor(canvas, audioBuilder) {
        this.DIM_X = 600;
        this.DIM_Y = 600;
        this.NUM_ASTEROIDS = 0;
        this.NUM_PLANETS = 0;
        this.NUM_POWER_SOURCES = 0;

        this.audioBuilder = audioBuilder;

        this.asteroids = [];
        this.explosions = [];
        this.bullets = [];
        this.spaceShip = new SpaceShip(
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
        this.powerSource = new PowerSource(this.generateRandomPos());
    }

    generateRandomPos() {
        const x = Math.floor(Math.random() * this.DIM_X);
        const y = Math.floor(Math.random() * this.DIM_Y);
        return {x: x, y: y};
    }

    addAsteroid(pos) {
       const asteroid = new Asteroid(pos);
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
                    this.explosions.push(new Explosion({
                        x: obj2.center.x - 45,
                        y: obj2.center.y - 45
                    }));
                    this.asteroids.splice(idx, 1);
                } else {
                    this.explosions.push(new Explosion({
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
            this.explosions.push(new Explosion({
                x: obj1.center.x - 45,
                y: obj2.center.y - 45
            }));
            this.audioBuilder.createAudio('sounds/asteroid-destroyed.mp3', .5).play();
            this.asteroids.splice(idx, 1);
            this.bullets.splice(jdx, 1);
        }

        if(obj1.type === 'asteroid' && obj2.type === 'asteroid') {
            
        }

    }

    atEdge(sprite) {
        if((sprite.center.x < 40 || sprite.center.x > this.DIM_X - 40) &&
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

export default Game;