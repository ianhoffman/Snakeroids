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

        this.radius = props.radius;
        this.color = props.color;

        this.move = this.move.bind(this);
        this.draw = this.draw.bind(this);
    }

    move() {
        this.pos.x += this.speed.x;
        this.pos.y += this.speed.y;
    }

    draw(ctx) {
       ctx.beginPath();
       ctx.arc(
           this.pos.x,
           this.pos.y,
           this.radius,
           0,
           2 * Math.PI
       );
       ctx.strokeStyle = this.color;
       ctx.stroke(); 
    }
}

export default MovingObject;