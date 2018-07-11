class Parent {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Block extends Parent {
    constructor(x, y, w, h, type) {
        super(x, y, w, h);
        this.type = type;
    }
}

class Player extends Parent {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.started = false;
        this.gravity = 0.2;
        this.speedX = 3;
        this.speedY = 3;
        this.accelaration = 0.4;
        this.limit = false;
    }
    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.x -= this.speedX;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.speedX;
        }

        if (!this.limit && keyIsDown(UP_ARROW)) {
            this.speedY += this.accelaration;
            playerJumped = true;
            console.log(this.speedY)
        }
    }

    jump() {
        if (this.y < 500) {
            if (this.speedY < 6) {
                this.y -= this.speedY;
            }
            else {
                //this.speedY = 0
                this.limit = true;
            }
            this.speedY -= this.gravity;
        }
        else {
            playerJumped = false
        }
    }

    die() {

    }

    checkCollision() {
        for (var b in blocks) {
            let block = blocks[b];


            if (this.y - block.y + this.h < this.h / 2 && this.y - block.y + this.h > 0 && this.x - block.x <= block.w && block.x - this.x <= this.w) {
                console.log('bottom collision')
                block.y = this.y + this.h;
            }
            else if (block.y - this.y + block.h < this.h / 2 && block.y - this.y + block.h > 0 && block.x - this.x <= this.w && this.x - block.x <= block.w) {
                console.log("top collision")
                block.y = this.y - block.h;
            }
            else if (block.x - (this.x + this.w) <= 0 && Math.abs((this.y + this.h / 2) - (block.y + block.h / 2)) < this.h / 2 + block.h / 2 && (block.x - (this.x + this.w)) > -this.w / 2) {
                console.log("left collision");
                block.x = this.x + this.w;
            }
            else if (this.x - (block.x + block.w) <= 0 && Math.abs((this.y + this.h / 2) - (block.y + block.h / 2)) < this.h / 2 + block.h / 2 && (this.x - (block.x + block.w)) > -block.w / 2) {
                console.log("right collision");
                block.x = this.x - this.w;
            }
        }
    }
}