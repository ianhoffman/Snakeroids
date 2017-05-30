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
        
        this.pos = {
            x: props.pos.x,
            y: props.pos.y
        };

        this.center = {
            x: props.pos.x + (this.width / 2),
            y: props.pos.y + (this.height / 2)
        };

        this.angle = props.angle;
        this.speed = props.speed;

        this.loaded = false;   
        this.onLoad = this.onLoad.bind(this);
        this.img.addEventListener('load', this.onLoad);

        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
        // this.updateCenter = this.updateCenter.bind(this);
        // this.updateCenter();
    }

    onLoad() {
        this.loaded = true;
        this.numColumns = Math.floor(this.img.width / this.width);
        this.numRows = Math.floor(this.img.height / this.height);
    }

    move() {
        this.pos.x += this.speed * Math.sin(this.angle);
        this.pos.y -= this.speed * Math.cos(this.angle);
        // this.updateCenter();
    }

    // updateCenter() {
    //     this.center = {
    //         x: this.pos.x + (-1 * this.height / 2 * Math.sin(this.angle)),
    //         y: this.pos.y + (this.height / 2 * Math.cos(this.angle))
    //     };
    // }

    render(ctx) {
        // if(this.type === 'spaceship') {
        //     console.log('pos x', this.pos.x);
        //     console.log('pos y', this.pos.y);
        //     console.log('center', this.center);
        //     console.log('angle', this.angle);
        // }

        ctx.save();
        ctx.translate(
            this.pos.x, 
            this.pos.y
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

    isCollidedWith(object) {
        if((object.pos.x < this.pos.x + this.width &&
            object.pos.x + object.width > this.pos.x) &&
            (object.pos.y < this.pos.y + this.height && 
            object.pos.y + object.height > this.pos.y) 
        ) {
            return true;
        }
        return false;
    }
}

export default Sprite;