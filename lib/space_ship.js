import MovingObject from './moving_object';

class SpaceShip extends MovingObject {

    constructor(props) {
        super({
            imageSrc: 'sprites/spaceship.png',
            pos: {
                x: props.x,
                y: props.y
            },
            vector: {
                x: 0,
                y: 0
            },
            dimensions: {
                x: 0,
                width: 948,
                y: 0,
                height: 720
            },
            scale: 20,
            frames: 0
        });

        // this.goForward = this.goForward.bind(this);
        // this.goBack = this.goBack.bind(this);
        // this.turnRight = this.turnRight.bind(this);
        // this.turnLeft = this.turnLeft.bind(this);

        // this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        // this.registerKeyHandlers();
    }

    registerKeyHandlers() {

    }

}

export default SpaceShip;