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
                width: 37,
                y: 0,
                height: 51
            },
            frameRate: 0,

            speed: 0,
            angle: 0
        });

        this.moveAngle = 0;
        this.type = 'spaceship';
        this.topLeftAngle = Math.asin((this.width / 2) / this.radius) * -1;

        this.dimensions = {
            topLeft: {
                x: null,
                y: null,
            },
            topRight: {
                x: null,
                y: null
            },
            bottomRight: {
                x: null,
                y: null
            },
            bottomLeft: {
                x: null,
                y: null
            }
        };

        this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        this.registerKeyHandlers();
        // this.getSpaceShipDimensions = this.getSpaceShipDimensions.bind(this);
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
        this.topLeftAngle += this.moveAngle * Math.PI / 180;

        this.dimensions.topLeft.x = this.center.x + (this.radius * Math.sin(this.topLeftAngle));
        this.dimensions.topLeft.y = this.center.y - (this.radius * Math.cos(this.topLeftAngle));
        
        this.dimensions.topRight.x = this.center.x + (this.radius * Math.sin(this.topLeftAngle * -1));
        this.dimensions.topRight.y = this.center.y - (this.radius * Math.cos(this.topLeftAngle * -1));

        this.dimensions.bottomRight.x = this.center.x + (this.radius * Math.sin(Math.PI - (this.topLeftAngle * -1)));
        this.dimensions.bottomRight.y = this.center.y - (this.radius * Math.cos(Math.PI - (this.topLeftAngle * -1)));
        
        this.dimensions.bottomLeft.x = this.center.x + (this.radius * Math.sin(Math.PI - (this.topLeftAngle)));
        this.dimensions.bottomLeft.y = this.center.y - (this.radius * Math.cos(Math.PI - (this.topLeftAngle)));
    }

    // getSpaceShipDimensions() {
    //     let low = this.dimensions.topLeft;
    //     let lowY = this.dimensions.topLeft;
    //     Object.keys(this.dimensions).forEach(key => {
    //         let corner = this.dimensions[key];
    //         if(corner.x < )
    //     }) 
    // }
}

export default SpaceShip;