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
                width: 70,
                y: 0,
                height: 70
            },
            scale: 2, 
            frameRate: 3,
            
            speed: Math.random() + 1,
            angle: Utils.randAngle()
        });
        this.type = 'asteroid';
    }
}

export default Asteroid;