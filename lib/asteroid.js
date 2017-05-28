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
                x: Utils.randDirection() * Math.random(), 
                y: Utils.randDirection() * Math.random()
            },
            color: 'gray',
            radius: 10
        });
    }
}

export default Asteroid;