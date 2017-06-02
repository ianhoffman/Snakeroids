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
        this.move = this.move.bind(this);
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

        //don't allow ship to move offscreen
        if(this.type === 'spaceship') {
            // if(this.fwdDecay > 0) {
            //     this.speed -= .5; 
            // }

            if(this.center.x - this.radius < 0 || this.center.x + this.radius > this.game.DIM_X) {
                this.center.x -= this.speed * Math.sin(this.angle);
            }
            if(this.center.y - this.radius < 0 || this.center.y + this.radius > this.game.DIM_Y) {
                this.center.y += this.speed * Math.cos(this.angle);
            }
        }
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