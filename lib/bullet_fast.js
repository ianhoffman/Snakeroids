/*
 * Do not import 'Sprite' because, by default, Sprite uses the pos passed
 * to it as the x, y coords for the upper left corner. This is fine for most 
 * subclasses, as we know their orientation on initialization is true-north.
 * However, bullet's orientation depends on the orientation of the ship, and 
 * therefore it's best to pass it a center, rather than the coord for one of its 
 * corners. This could be something to refactor for all classes, given time. 
 */

class FastBullet {
  constructor(props) {
    this.img = new Image();
    this.img.src = 'sprites/death_ray.png';

    this.x = 0;
    this.y = 0;
    this.width = 16;
    this.height = 20; 

    this.speed = 16;
    this.angle = props.angle;
    this.type = 'bullet';

    this.center = {
      x: props.x,
      y: props.y
    };

    this.radius = Math.sqrt(
      Math.pow((this.width/2), 2) 
      + Math.pow((this.height/2), 2)
    );

    this.loaded = false;   
    this.onLoad = this.onLoad.bind(this);
    this.img.addEventListener('load', this.onLoad);
    this.render = this.render.bind(this);
  }

  onLoad() {
        this.loaded = true;
  }

  render(ctx) {
        ctx.save();
        ctx.translate(
            this.center.x, 
            this.center.y
        );
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height,
            this.x - (this.width / 2),
            this.y - (this.height / 2),
            this.width,
            this.height
        );

        ctx.restore();
    }

    move() {
      this.center.x += this.speed * Math.sin(this.angle);
      this.center.y -= this.speed * Math.cos(this.angle);
    }

}

export default FastBullet;