import Sprite from './sprite';
import Bullet from './bullet';
import FastBullet from './bullet_fast';
import RocketExhaust from './rocket_exhaust';

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
        this.bulletQueued = false;
        this.goingFwd = false;
        this.goingBck = false;
        this.fireCountdown = 0;

        this.type = 'spaceship';
        this.sourceCount = 0;
        this.game = props.game;
        this.shieldIteration = 0;
        this.statusInterval = 0;

        this.statusBar = document.getElementById('status-bar');
        this.status = document.getElementById('status');

        this.registerKeyHandlers = this.registerKeyHandlers.bind(this);
        this.unregisterListeners = this.unregisterListeners.bind(this);
        this.registerKeyHandlers();

        this.fireBullet = this.fireBullet.bind(this);

        this.setToDefaults = this.setToDefaults.bind(this);
        this.setToDefaults();

    }

    registerKeyHandlers() {
        this.keydownListener = window.addEventListener('keydown', e => {
            e.preventDefault();
            if((e.keyCode === 87 || e.keyCode === 38) && !this.goingBck) {
                this.goingFwd = true;
            } 
            if((e.keyCode === 83 || e.keyCode === 40) && !this.goingFwd) {
                this.goingBck = true;
            }
            if(e.keyCode === 65 || e.keyCode === 37) {
                this.moveAngle = (this.turnSpeed * -1);
            }
            if(e.keyCode === 68 || e.keyCode === 39) {
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
            if(e.keyCode === 87 || e.keyCode === 38) {
                this.goingFwd = false;
                this.slowingDown = true;
            } 
            if(e.keyCode === 83 || e.keyCode === 40) {
                this.goingBck = false;
                this.slowingDown = true;
            }
            if(e.keyCode === 65 || e.keyCode === 37) {
                this.moveAngle = 0;
            }
            if(e.keyCode === 68 || e.keyCode === 39) {
                this.moveAngle = 0;
            }
        });
    }

    move() {
        if(this.goingFwd && this.speed < this.maxFwdSpeed) {
            this.speed += this.fwdAccel;
        } else if(this.goingBck && this.speed > this.maxBckSpeed) {
            this.speed -= this.bckAccel;
        } else if(this.slowingDown && this.speed > 0) {
            this.speed -= 2;
            if(this.speed < 0) {
                this.speed = 0;
                this.slowingDown = false;
            }
        } else if(this.slowingDown && this.speed < 0) {
            this.speed += 2;
            if(this.speed > 0) {
                this.speed = 0;
                this.slowingDown = false;
            }
        }
        super.move();
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
            this.setToDefaults();
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
        
        if(this.fwdSpeed === 24) {
            let rocketExhaust = new RocketExhaust({
                x: this.center.x - (Math.sin(this.angle) * this.radius),
                y: this.center.y + (Math.cos(this.angle) * this.radius)
            });
            rocketExhaust.angle = this.angle;
            this.game.rocketExhaust = rocketExhaust;
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

        this.setToDefaults();

        if(rand < .25) {
            this.turnSpeed = 24;
            this.status.innerHTML = 'Extra Torque';
            this.statusInterval = 100;
        }
        if(rand >= .25 && rand < .5) {
            this.maxFwdSpeed = 20;
            this.maxBckSpeed = -13;
            this.fwdAccel = 1.4;
            this.bckAccel = .75;
            this.status.innerHTML = 'Warpspeed';
            this.statusInterval = 100;
        }
        if(rand >= .5 && rand < .75) {
            this.shieldsUp = true;
            this.status.innerHTML = 'Shields Up';
            this.statusInterval = 100;
        }
        if(rand >= .75 && rand < 1) {
            this.doubleBarrel = true;
            this.status.innerHTML = 'Dual Wield';
            this.statusInterval = 100;
        }
    }

    fireBullet() {
        const x = this.center.x + (Math.sin(this.angle) * this.radius);
        const y = this.center.y - (Math.cos(this.angle) * this.radius);

        let bullet, bullet2; 
        if(this.doubleBarrel) {
            bullet = new FastBullet({
                x: x,
                y: y
            });

            bullet.angle = this.angle + .1;
            this.game.addBullet(bullet);

            bullet2 = new FastBullet({
                x: x,
                y: y
            });

            bullet2.angle = this.angle - .1;
            this.game.addBullet(bullet2);
        } else {
            bullet = new Bullet({
                x: x,
                y: y
            });
            bullet.angle = this.angle;
            this.game.addBullet(bullet);
        }

    }

    setToDefaults() {
        this.shieldsUp = false;
        this.turnSpeed = 12; 
        this.maxFwdSpeed = 14;
        this.maxBckSpeed = -8;
        this.fwdAccel = 1;
        this.bckAccel = .5;
        this.doubleBarrel = false;
        this.firePause = 5;
    }
}

export default SpaceShip;