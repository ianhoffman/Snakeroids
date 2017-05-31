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
            frameRate: 1,
            
            speed: Math.random() + 1,
            angle: Utils.randAngle()
        });
        this.type = 'asteroid';
        this.audio = document.getElementById('asteroid-destroyed');
        this.audio.playbackRate = 0.5;

        this.destroyFx = this.destroyFx.bind(this);
    }

    destroyFx() {
        this.audio.play();
    }


}

export default Asteroid;