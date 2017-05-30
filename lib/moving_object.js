import Sprite from './sprite';

class MovingObject { 
    constructor(props) {
        this.pos = {
            x: props.pos.x,
            y: props.pos.y
        };

        this.vector = {
            x: props.vector.x,
            y: props.vector.y
        };
        
        this.dimensions = {
            x: props.dimensions.x,
            y: props.dimensions.y,
            width: Math.floor(props.dimensions.width / props.scale),
            height: Math.floor(props.dimensions.height / props.scale)
        };

        this.sprite = new Sprite({
            imageSrc: props.imageSrc,
            dimensions: props.dimensions, 
            scale: props.scale,
            frames: props.frames
        });

        this.move = this.move.bind(this);
        this.draw = this.draw.bind(this);
    }

    move() {
        this.pos.x += this.vector.x;
        this.pos.y += this.vector.y;
    }

    draw(ctx) {
        this.sprite.render(ctx, this.pos);
    }

    isCollidedWith(movingObject) {
        if ((this.pos.x <= movingObject.pos.x ||
            this.pos.x + this.dimensions.width >= movingObject.pos.x + movingObject.dimensions.width) &&
            (this.pos.y <= movingObject.pos.y || 
            this.pos.y + this.dimensions.height >= movingObject.pos.x + movingObject.dimensions.height)) {
        }
    }
}

export default MovingObject;