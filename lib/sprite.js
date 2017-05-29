class Sprite {
    constructor(props) {
        this.img = new Image();
        this.img.src = props.imageSrc;
        this.xStart = props.dimensions.xStart;
        this.xEnd = props.dimensions.xEnd;
        this.yStart = props.dimensions.yStart;
        this.yEnd = props.dimensions.yEnd; 
        
        this.loaded = false;   

        this.onLoad = this.onLoad.bind(this);
        this.img.addEventListener('load', this.onLoad);

        this.render = this.render.bind(this);
    }

    onLoad() {
        this.loaded = true;
    }

    render(ctx, pos) {
        ctx.drawImage(
            this.img,
            this.xStart,
            this.yStart,
            this.xEnd,
            this.yEnd,
            pos.x,
            pos.y,
            (this.xEnd) / 3,
            (this.yEnd) / 3
        );
    }
}

export default Sprite;