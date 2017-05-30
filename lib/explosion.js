import Sprite from './sprite';

class Explosion extends Sprite {
  constructor(props) {
    super({
      imageSrc: 'sprites/explosions.png',
          pos: {
              x: props.x, 
              y: props.y
          },
          dimensions: {
              x: 0,
              width: 100,
              y: 0,
              height: 100
          },
          frameRate: 1,

          speed: 0,
          angle: 0,
    });
    this.type = 'explosion';
  }
}

export default Explosion;