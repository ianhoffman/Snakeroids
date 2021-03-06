import Sprite from './sprite';
import * as Utils from './utils';

class Asteroid extends Sprite {
    constructor(props) {
        super({
            imageSrc: 'sprites/animated_asteroid.png',
            pos: {
                x: props.x, 
                y: props.y
            },
            dimensions: {
                x: 0,
                width: 35,
                y: 0,
                height: 35
            },
            frameRate: 0,
            
            speed: (Math.random()) + 4,
            angle: Utils.randAngle()
        });
        this.type = 'asteroid';
    }
}

export default Asteroid;