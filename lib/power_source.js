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
      frameRate: 2,
      speed: 0,
      angle: 0
    });
    this.type = 'powersource';
  }

  teleport(width, height) {
    this.center.x = Math.random() * width;
    this.center.y = Math.random() * height;
  }

  
}

export default PowerSource;