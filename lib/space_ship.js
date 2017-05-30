import Sprite from './sprite';

class SpaceShip extends Sprite {

    constructor(props) {
        super({
            imageSrc: 'sprites/spaceship.png',
            pos: {
                x: props.x,
                y: props.y
            },
            dimensions: {
                x: 0,
                width: 746,
                y: 0,
                height: 1021
            },
            scale: 20,
            frames: 0,
            speed: 0,
            angle: 0
        });

        this.moveAngle = 0;

        this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        this.registerKeyHandlers();
    }

    registerKeyHandlers() {
        window.addEventListener('keydown', (e) => {
            if(e.keyCode === 87) {
                this.speed = 2;
            } 
            if(e.keyCode === 83) {
                this.speed = -1;
            }
            if(e.keyCode === 65 && !this.turningRight) {
                this.moveAngle = -2;
            }
            if(e.keyCode === 68 && !this.turningLeft) {
                this.moveAngle = 2;
            }
        });
        window.addEventListener('keyup', (e) => {
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

    turn() {
        this.angle += this.moveAngle * Math.PI / 180;
    }
}

export default SpaceShip;