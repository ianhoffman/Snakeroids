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
        this.fwdSpeed = 3;
        this.turnSpeed = 3;
        this.bckSpeed = -2;

        this.firePause = 35;
        this.bulletQueued = false;
        this.fireCountdown = 0;

        this.type = 'spaceship';
        this.sourceCount = 0;
        this.game = props.game;
        this.shieldIteration = 0;
        this.shieldsUp = false;
        this.statusInterval = 0;

        this.statusBar = document.getElementById('status-bar');
        this.status = document.getElementById('status');

        this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        this.unregisterListeners = this.unregisterListeners.bind(this);
        this.registerKeyHandlers();

        this.fireBullet = this.fireBullet.bind(this);
    }

    registerKeyHandlers() {
        this.keydownListener = window.addEventListener('keydown', e => {
            e.preventDefault();
            if(e.keyCode === 87) {
                this.speed = this.fwdSpeed;
            } 
            if(e.keyCode === 83) {
                this.speed = this.bckSpeed;
            }
            if(e.keyCode === 65) {
                this.moveAngle = (this.turnSpeed * -1);
            }
            if(e.keyCode === 68) {
                this.moveAngle = this.turnSpeed;
            }
            if(e.keyCode === 32 && this.fireCountdown === 0) {
                this.fireBullet();
                this.fireCountdown = this.firePause;
            } else if(e.keyCode === 32 && this.fireCountdown > 0 && !this.bulletQueued) {
                this.bulletQueued = true;
            }
        });

        this.keyupListener = window.addEventListener('keyup', (e) => {
            e.preventDefault();
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

    render(ctx) {

        if(this.fireCountdown > 0) {
            this.fireCountdown -= 1;
        }
        
        else if(this.fireCountdown === 0 && this.bulletQueued) {
            this.fireBullet();
            this.bulletQueued = false;
            this.fireCountdown = this.firePause;
        }

        if(this.statusInterval > 0) {
            this.statusInterval -= 1;
        }

        if(this.statusInterval === 0) {
            this.shieldsUp = false;
            this.turnSpeed = 3;
            this.fwdSpeed = 3;
            this.bckSpeed = -2;
            this.firePause = 35;
            if(this.statusBar.style.display === 'block') {
                this.statusBar.style.display = 'none';
            }
        }

        if(this.shieldsUp) {
            if(this.shieldIteration % 2 === 0) {
                ctx.beginPath();
                ctx.arc(
                    this.center.x,
                    this.center.y,
                    this.radius,
                    0, 
                    2 * Math.PI
                );
                ctx.strokeStyle = 'teal';
                ctx.lineWidth = 3;
                ctx.setLineDash([1, 2]);
                ctx.stroke();
            } 
            this.shieldIteration += 1;
        }

        super.render(ctx);
        
        if(this.sourceCount >= 4) {

        }
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
        this.statusBar.style.display = 'block';

        const rand = Math.random();

        this.shieldsUp = false;
        this.moveAngle = 0;
        this.fwdSpeed = 3;
        this.turnSpeed = 3;
        this.bckSpeed = -2;
        this.firePause = 35;

        if(rand < .25) {
            this.turnSpeed *= 2;
            this.status.innerHTML = 'Extra Torque';
            this.statusInterval = 250;
        }
        if(rand >= .25 && rand < .5) {
            this.fwdSpeed *= 2;
            this.bckSpeed *= 2;
            this.status.innerHTML = 'Warspeed';
            this.statusInterval = 250;
        }
        if(rand >= .5 && rand < .75) {
            this.shieldsUp = true;
            this.status.innerHTML = 'Shields Up';
            this.statusInterval = 250;
        }
        if(rand >= .75 && rand < 1) {
            this.firePause = 1;
            this.status.innerHTML = 'Rapid Fire';
            this.statusInterval = 250;
        }
    }

    fireBullet() {
        const x = this.center.x + (Math.sin(this.angle) * this.radius);
        const y = this.center.y - (Math.cos(this.angle) * this.radius);

        const bullet = new Bullet({
            x: x,
            y: y
        });

        bullet.angle = this.angle;
        this.game.addBullet(bullet);
    }
}

export default SpaceShip;