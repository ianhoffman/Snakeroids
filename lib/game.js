import Asteroid from './asteroid';
import SpaceShip from './space_ship';

class Game {
    constructor(props) {
        this.DIM_X = 800;
        this.DIM_Y = 800;
        this.NUM_ASTEROIDS = 0;
        this.NUM_PLANETS = 0;
        this.NUM_POWER_SOURCES = 0;

        this.asteroids = [];
        this.planets = [];
        this.power_sources = [];
        this.spaceShip = new SpaceShip({
            x: this.DIM_X / 2,
            y: this.DIM_Y / 2
        });

        this.createInitialView = this.createInitialView.bind(this);
        this.generateRandomPos = this.generateRandomPos.bind(this);
        this.addAsteroid = this.addAsteroid.bind(this);
        this.draw = this.draw.bind(this);
        this.moveObjects = this.moveObjects.bind(this);
        this.generateOffscreenElement = this.generateOffscreenElement.bind(this);
        this.getCollisions = this.getCollisions.bind(this);

        this.createInitialView();
    }

    createInitialView() {
        for( let i = 0; i < 5; i ++ ) {
            const pos = this.generateRandomPos();
            this.addAsteroid(pos);
        }
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
        if(this.spaceShip.sprite.loaded) {
            this.spaceShip.draw(ctx);
        }

        this.asteroids.forEach(asteroid => {
            if(asteroid.sprite.loaded) {  //wait for sprite's onLoad handler
                asteroid.draw(ctx);
            }
        });
    }

    moveObjects() {
        this.spaceShip.turn();
        this.spaceShip.move();
        this.asteroids.forEach(asteroid => {
            asteroid.move();
        });
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
        for (let i = 0; i < this.asteroids.length; i++) {
            let currAsteroid = this.asteroids[i];
            for (let j = 0; j < this.asteroids.length; j++) {
                if (j !== i) {
                    if (currAsteroid.isCollidedWith(this.asteroids[j])) {
                    }
                }
            }
        }
    }
}

export default Game;