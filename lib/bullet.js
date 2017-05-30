import MovingObject from './moving_object';
import * as Utils from './utils';

class Bullet extends MovingObject {
    constructor(props) {
        super({
            imageSrc: 'sprites/animated_asteroid.png',
            pos: {
                x: props.x, 
                y: props.y
            },
            speed: {
                x: 2, 
                y: 2
            },
            dimensions: {
                x: 0,
                width: 10,
                y: 0,
                height: 10
            },
            scale: 4, 
            frames: 1
        });
    }
}

export default Bullet;