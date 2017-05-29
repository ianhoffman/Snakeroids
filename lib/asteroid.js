import MovingObject from './moving_object';
import * as Utils from './utils';

class Asteroid extends MovingObject {
    constructor(props) {
        super({
            pos: {
                x: props.x, 
                y: props.y
            },
            speed: {
                x: (Utils.randDirection() * Math.random()) / 2.5, 
                y: (Utils.randDirection() * Math.random()) / 2.5
            },
            imageSrc: 'sprites/animated_asteroid.png',
            dimensions: {
                x: 0,
                width: 70,
                y: 0,
                height: 70
            }
        });
    }
}

export default Asteroid;