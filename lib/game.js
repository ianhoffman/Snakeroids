import Asteroid from './asteroid';

class Game {
    constructor(props) {
        this.DIM_X = 800;
        this.DIM_Y = 800;
        this.NUM_ASTEROIDS = 0;
        this.NUM_PLANETS = 0;
        this.NUM_FUEL_SOURCES = 0;

        this.asteroids = [];
        this.planets = [];
        this.fuel_sources = [];
        this.spaceShip = null;

        this.createInitialView = this.createInitialView.bind(this);
        this.generateRandomPos = this.generateRandomPos.bind(this);
        this.addAsteroid = this.addAsteroid.bind(this);
        this.draw = this.draw.bind(this);

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
        this.asteroids.forEach(asteroid => {
            asteroid.draw(ctx);
        });
    }
}

export default Game;