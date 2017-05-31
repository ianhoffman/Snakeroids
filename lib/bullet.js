import Sprite from './sprite';

class Bullet extends Sprite {
  constructor(props) {
    super({
      imageSrc: 'sprites/beams.png',
          pos: {
              x: props.x, 
              y: props.y
          },
          dimensions: {
              x: 0,
              width: 17,
              y: 0,
              height: 20
          },
          frameRate: 1,

          speed: 3,
          angle: 0,
    });
    this.type = 'bullet';
  }

}

export default Bullet;