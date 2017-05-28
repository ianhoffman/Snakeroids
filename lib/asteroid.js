import MovingObject from './moving_object';

class Asteroid extends MovingObject {
    constructor(props) {
        super({
            pos: {x: props.x, y: props.y},
            color: 'gray',
            speed: {x: 0, y: 0},
            radius: 10
        });
    }
}

export default Asteroid;