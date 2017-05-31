// import Sprite from './sprite';

class Bullet {
  constructor(props) {
    this.img = new Image();
    this.img.src = 'sprites/beams.png';

    this.x = 0;
    this.y = 0;
    this.width = 17;
    this.height = 20; 

    this.speed = 5;
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

export default Bullet;