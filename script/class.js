class Parent {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Block extends Parent {
    constructor(x, y, w, h, type, color, id) {
        super(x, y, w, h);
        this.type = type;
        this.color = color;
        this.id = id;
    }

    deleteBlock() {
        if (this.x + this.w / 2 > deleteButton.x - x && this.x + this.w / 2 < deleteButton.x - x + deleteButton.size && this.y + this.h / 2 > deleteButton.y - y && this.y + this.h / 2 < deleteButton.y - y + deleteButton.size) {
            blocks.splice(this.id, 1)
        }
    }
}

class Player extends Parent {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.speedX = 3;
        this.speedY = 3;
        this.accelaration = 0.4;
        this.limit = false;
    }
    /*    move() {
            if (keyIsDown(LEFT_ARROW)) {
                this.x -= this.speedX;
            }
    
            if (keyIsDown(RIGHT_ARROW)) {
                this.x += this.speedX;
            }
    
            if (!this.limit && keyIsDown(UP_ARROW)) {
                this.speedY += this.accelaration;
                playerJumped = true;
                //console.log(this.speedY)
            }
            else {
                let collBlock = this.checkButtom()
                if (collBlock) {
                    playerJumped = false;
                    this.y = collBlock.y - this.h;
                }
            }
        }
    
    
        jump() {
            if (this.speedY < 6) {
                this.y -= this.speedY;
            }
            else {
                this.limit = true;
            }
            this.speedY -= this.gravity;
        }
    
        die() {
    
        }
    
        fall() {
            let collBlock = this.checkButtom()
            if (!collBlock) {
                this.speedY -= this.gravity;
                this.y -= this.speedY;
            }
            else {
                this.speedY = 3;
            }
        }
        checkButtom() {
            let collBlock = blocks.find(function (block) {
                return player.y - block.y + player.h < player.h / 2 && player.y - block.y + player.h > 0 && player.x - block.x <= block.w && block.x - player.x <= player.w
            });
            return collBlock;
        }
        checkCollision() {
            for (var b in blocks) {
                let block = blocks[b];
                if (this.y - block.y + this.h < this.h / 2 && this.y - block.y + this.h > 0 && this.x - block.x <= block.w && block.x - this.x <= this.w) {
    
                    block.y = this.y + this.h;
                }
                else if (block.y - this.y + block.h < this.h / 2 && block.y - this.y + block.h > 0 && block.x - this.x <= this.w && this.x - block.x <= block.w) {
                    block.y = this.y - block.h;
                }
                else if (this.x + this.w / 2 - (block.x + block.w / 2) < 0 && this.x + this.w / 2 - (block.x + block.w / 2) > -(this.w / 2 + block.w / 2) && Math.abs((this.y + this.h / 2) - (block.y + block.h / 2)) < this.h / 2 + block.h / 2) {
    
                    block.x = this.x + this.w;
                }
                else if (this.x + this.w / 2 - (block.x + block.w / 2) > 0 && this.x + this.w / 2 - (block.x + block.w / 2) < (this.w / 2 + block.w / 2) && Math.abs((this.y + this.h / 2) - (block.y + block.h / 2)) < this.h / 2 + block.h / 2)
                    block.x = this.x - this.w;
            }
        }
    
    */
}

class HorizontalBlock extends Block {
    constructor(x, y, w, h, type, color, id, dirX, editRange) {
        super(x, y, w, h, type, color, id);
        this.staticX = this.x;
        this.dirX = dirX;
        this.editRange = editRange;
        this.editor = {
            x: this.x + this.w + this.editRange,
            y: this.y,
            w: this.w,
            h: this.h
        }
    }
    move() {
        if (this.x < this.staticX - this.editRange || this.x > this.staticX + this.editRange) {
            this.dirX *= -1;
        }
        this.x += this.dirX;
    }

    edit() {
        if (mouseIsPressed) {
            if (mouseX > this.editor.x && mouseX < this.editor.x + this.editor.w && mouseY > this.editor.y && mouseY  < this.editor.y + this.editor.h) {
                this.editor.x  = mouseX - this.editor.w/2;
                this.editRange = this.editor.x - this.x + this.editor.w/2;
            }
        }
    }
}


class VerticalBlock extends Block {
    constructor(x, y, w, h, type, color, id, dirY, editRange) {
        super(x, y, w, h, type, color, id);
        this.staticY = this.y;
        this.dirY = dirY;
        this.editRange = editRange;
    }
    move() {
        if (this.y < this.staticY - this.editRange || this.y > this.staticY + this.editRange) {
            this.dirY *= -1
        }
        this.y += this.dirY;
    }

    edit() {

    }
}

class SandBlock extends Block {
    constructor(x, y, w, h, type, color, id) {
        super(x, y, w, h, type, color, id);
    }
    break() {

    }
}


player = new Player(50, 200, 50, 100)