import MovingObject from './moving_object';
import * as Utils from './utils';

class PowerSource extends MovingObject {
    constructor(props) {
        super({
            imageSrc: 'sprites/____.png',
            pos: {
                x: props.x, 
                y: props.y
            },
            speed: {
                x: 0, 
                y: 0
            },
            dimensions: {
                x: 0,
                width: 70,
                y: 0,
                height: 70
            },
            scale: 4, 
            frames: 16
        });
    }
}

export default PowerSource;