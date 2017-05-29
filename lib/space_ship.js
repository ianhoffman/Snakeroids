import MovingObject from './moving_object';

class SpaceShip extends MovingObject {
    constructor(props) {
        super({
            color: 'gray',
            pos: {
                x: props.x,
                y: props.y
            },
            speed: {
                x: 0,
                y: 0
            }
        });
    }
}