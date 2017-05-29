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
            imageSrc: 'sprites/asteroid.png',
            dimensions: {
                xStart: 0,
                xEnd: 69,
                yStart: 19,
                yEnd: 26
            }
        });
    }
}

export default Asteroid;