import Sprite from './sprite';

class MovingObject { 
    constructor(props) {
        this.pos = {
            x: props.pos.x,
            y: props.pos.y
        };

        this.speed = {
            x: props.speed.x,
            y: props.speed.y
        };

        this.sprite = new Sprite({
            imageSrc: props.imageSrc,
            dimensions: props.dimensions
        });

        this.move = this.move.bind(this);
        this.draw = this.draw.bind(this);
    }

    move() {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }

    draw(ctx) {
        this.sprite.render(ctx, this.pos);
    }



}

export default MovingObject;