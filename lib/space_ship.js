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

        this.moveAngle = 0;

        this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        this.registerKeyHandlers();
    }

    registerKeyHandlers() {
        window.addEventListener('keydown', (e) => {
            if(e.keyCode === 87) {
                this.vector.x += 2;
            } 
            if(e.keyCode === 83) {
                this.vector.x -= 1;
            }
            if(e.keyCode === 65 && !this.turningRight) {
                this.moveAngle = -1;
            }
            if(e.keyCode === 68 && !this.turningLeft) {
                this.moveAngle = 1;
            }
        });
        window.addEventListener('keyup', (e) => {
            if(e.keyCode === 87) {
                this.vector.x = 0;
                this.vector.y = 0;
            } 
            if(e.keyCode === 83) {
                this.vector.x = 0;
                this.vector.y = 0;
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
        this.sprite.angle += this.moveAngle * Math.PI / 180;
    }
}

export default SpaceShip;