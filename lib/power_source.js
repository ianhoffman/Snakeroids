import Sprite from './sprite';

class PowerSource extends Sprite {
  constructor(props) {
    super({
      imageSrc: 'sprites/power_source.png',
      pos: {
          x: props.x, 
          y: props.y
      },
      dimensions: {
          x: 0,
          width: 46,
          y: 0,
          height: 42
      },
      frameRate: 0,
      
      speed: 0,
      angle: 0
    });
    this.type = 'powerSource';
    this.currFrame = 0;
  }

  oscillate() {
    this.currFrame += 1;
    if(this.currFrame === 10) {
      this.currFrame = 0;
    }
  }
}

export default PowerSource;