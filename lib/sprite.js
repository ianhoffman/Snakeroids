class Sprite {
    constructor(props) {
        this.img = new Image();
        this.img.src = props.imageSrc;

        this.frameRate = props.frameRate;
        this.currFrame = 0;
        this.currCol = 0;
        this.currRow = 0;

        this.x = props.dimensions.x;
        this.y = props.dimensions.y;
        this.width = props.dimensions.width;
        this.height = props.dimensions.height; 

        this.center = {
            x: props.pos.x + (this.width / 2),
            y: props.pos.y + (this.height / 2)
        };
        this.radius = Math.sqrt(
            Math.pow((this.center.x - props.pos.x), 2) 
            + Math.pow((this.center.y - props.pos.y), 2));

        this.angle = props.angle;
        this.speed = props.speed;

        this.loaded = false;   
        this.onLoad = this.onLoad.bind(this);
        this.img.addEventListener('load', this.onLoad);

        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
    }

    onLoad() {
        this.loaded = true;
        this.numColumns = Math.floor(this.img.width / this.width);
        this.numRows = Math.floor(this.img.height / this.height);
    }

    move() {
        this.center.x += this.speed * Math.sin(this.angle);
        this.center.y -= this.speed * Math.cos(this.angle);
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
            (this.currCol * this.width) + this.x,
            (this.currRow * this.height) + this.y,
            this.width,
            this.height,
            this.x - (this.width / 2),
            this.y - (this.height / 2),
            this.width,
            this.height
        );
        ctx.restore();
        this.update();
    }

    update() {
        if(this.currFrame === this.frameRate) {
            this.currCol += 1;
            this.currFrame = 0;
        } else {
            this.currFrame += 1;
        }

        if(this.currCol === this.numColumns) {
            this.currCol = 0;
            this.currRow += 1;
        }

        if(this.currRow === this.numRows ) {
            this.currRow = 0;
        }
    }

    isCollidedWith(sprite) {
        // if((object.pos.x < this.pos.x + this.width &&
        //     object.pos.x + object.width > this.pos.x) &&
        //     (object.pos.y < this.pos.y + this.height && 
        //     object.pos.y + object.height > this.pos.y) 
        // ) {
        //     return true;
        // }
        // return false;
        // if (sprite.type !== 'spaceship') {
        //     sprite.dimensions = sprite.getDimensions();
        // } 
        // if (this.type !== 'spaceship') {
        //     this.dimensions = this.getDimensions();
        // }

        // let corner;
        // Object.keys(sprite.dimensions).forEach(key => {
        //     corner = sprite.dimensions[key];
        //     if(corner.x < this.dimensions.topLeft.x)
        // });
        if(this.center.x < sprite.center.x + sprite.radius &&
            this.center.x > sprite.center.x - sprite.radius &&
            this.center.y < sprite.center.y + sprite.radius &&
            this.center.y > sprite.center.y - sprite.radius
        ) {
            return true;
        }
        return false;
    }

}

export default Sprite;