import Sprite from './sprite';
import Bullet from './bullet';

class SpaceShip extends Sprite {

    constructor(props) {
        super({
            imageSrc: 'sprites/spaceship.png',
            pos: {
                x: props.pos.x,
                y: props.pos.y
            },
            dimensions: {
                x: 0,
                width: 37,
                y: 0,
                height: 51
            },
            frameRate: 0,

            speed: 0,
            angle: 0
        });

        this.moveAngle = 0;
        this.type = 'spaceship';
        this.sourceCount = 0;
        this.game = props.game;

        this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        this.unregisterListeners = this.unregisterListeners.bind(this);
        this.registerKeyHandlers();

        this.fireBullet = this.fireBullet.bind(this);
    }

    registerKeyHandlers() {
        this.keydownListener = window.addEventListener('keydown', (e) => {
            if(e.keyCode === 87) {
                this.speed = 2;
            } 
            if(e.keyCode === 83) {
                this.speed = -1;
            }
            if(e.keyCode === 65 && !this.turningRight) {
                this.moveAngle = -2;
            }
            if(e.keyCode === 68 && !this.turningLeft) {
                this.moveAngle = 2;
            }
            if(e.keyCode === 32) {
                this.fireBullet();
            }
        });
        this.keyupListener = window.addEventListener('keyup', (e) => {
            if(e.keyCode === 87) {
                this.speed = 0;
            } 
            if(e.keyCode === 83) {
                this.speed = 0;
            }
            if(e.keyCode === 65) {
                this.moveAngle = 0;
            }
            if(e.keyCode === 68) {
                this.moveAngle = 0;
            }
        });
    }

    unregisterListeners() {
        document.removeEventListener('keydown', this.keydownListener);
        document.removeEventListener('keyup', this.keyupListener);
    }

    turn() {
        this.angle += this.moveAngle * Math.PI / 180;
    }

    registerPoint() {
        this.sourceCount += 1;
        document.getElementById('score').innerHTML = this.sourceCount;
    }

    fireBullet() {
        const x = this.center.x + (Math.sin(this.angle) * this.radius);
        const y = this.center.y - (Math.cos(this.angle) * this.radius);

        const bullet = new Bullet({
            x: x,
            y: y
        });
        bullet.angle = this.angle;
        this.game.bullets.push(bullet);
    }
}

export default SpaceShip;