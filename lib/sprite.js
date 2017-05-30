class Sprite {
    constructor(props) {
        this.img = new Image();
        this.img.src = props.imageSrc;
        this.frameRate = props.frames;
        this.currFrame = 1;

        this.x = props.dimensions.x;
        this.y = props.dimensions.y;
        this.width = props.dimensions.width;
        this.height = props.dimensions.height; 
        this.scale = props.scale;
        
        this.loaded = false;   

        this.onLoad = this.onLoad.bind(this);
        this.img.addEventListener('load', this.onLoad);

        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
    }

    onLoad() {
        this.loaded = true;
        this.numFrames = this.img.width / this.width;
        this.currSprite = 0;
    }

    render(ctx, pos) {
        ctx.drawImage(
            this.img,
            (this.currSprite * this.width) + this.x,
            this.y,
            this.width,
            this.height,
            pos.x,
            pos.y,
            (Math.floor(this.width / this.scale)),
            (Math.floor(this.height / this.scale))
        );
        this.update();

    }

    update() {
        if(this.currFrame === this.frameRate) {
            this.currSprite += 1;
            this.currFrame = 1;
        } else {
            this.currFrame += 1;
        }

        if(this.currSprite >= this.numFrames) {
            this.currSprite = 0;
        }
    }
}

export default Sprite;