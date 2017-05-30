import MovingObject from './moving_object';
import * as Utils from './utils';

class Asteroid extends MovingObject {
    constructor(props) {
        const vector = Utils.randVector();
        super({
            imageSrc: 'sprites/animated_asteroid.png',
            pos: {
                x: props.x, 
                y: props.y
            },
            vector: {
                x: vector.x, 
                y: vector.y
            },
            dimensions: {
                x: 0,
                width: 70,
                y: 0,
                height: 70
            },
            scale: 2, 
            frames: 3
        });
    }
}

export default Asteroid;