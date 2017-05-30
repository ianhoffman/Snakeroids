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
        this.scaledWidth = Math.floor(this.width / props.scale);
        this.scaledHeight = Math.floor(this.height / props.scale);

        this.pos = {
            x: props.pos.x,
            y: props.pos.y
        };

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
        this.pos.x += this.speed * Math.sin(this.angle);
        this.pos.y -= this.speed * Math.cos(this.angle);
    }

    render(ctx) {
        ctx.save();
        ctx.translate(
            this.pos.x + (Math.floor(this.scaledWidth / 2)), 
            this.pos.y + (Math.floor(this.scaledHeight / 2))
        );
        ctx.rotate(this.angle);
        ctx.drawImage(
            this.img,
            (this.currCol * this.width) + this.x,
            (this.currRow * this.height) + this.y,
            this.width,
            this.height,
            this.x,
            this.y,
            this.scaledWidth,
            this.scaledHeight
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

    isCollidedWith(object) {
        if(
            (object.pos.x < this.pos.x + this.scaledWidth && object.pos.x + object.scaledWidth > this.pos.x)
            &&
            (object.pos.y < this.pos.y + this.scaledHeight && object.pos.y + object.scaledHeight > this.pos.y) 
        ) {
            return true;
        }
        return false;
    }
}

export default Sprite;