class Parent {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Player extends Parent {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.speedX = 3;
        this.speedY = 0;
        this.accelaration = 0.4;
        this.limit = false;
        this.color = playerColor;
        this.collision = {
            right: false,
            left: false,
            up: false,
            down: false
        }
    }

    animate() {
        translate(x, y)
        if (!gameStarted) {
            fill(...this.color, playerOpacity)
        }
        else {
            fill(...this.color);
            // player.move();
        }
        rect(this.x, this.y, this.w, this.h);
        translate(-x, -y)
    }

    play() {
        this.move();
        this.checkCollision();
        // this.win();
        // this.die();
    }

    move() {
        if (keyIsDown(LEFT_ARROW) && !this.collision.left) {
            this.x -= this.speedX;
        }
        else if (keyIsDown(RIGHT_ARROW) && !this.collision.right) {
            this.x += this.speedX
        }
        if (keyIsDown(UP_ARROW) && !this.collision.up) {
            if (this.speedY > -2) {
                // console.log(this.speedY)
                this.speedY -= this.accelaration
            }
            else {
                // console.log(this.limit)
                // if (this.limit) {
                this.speedY = 0;
                this.limit = true;
                //}
            }
        }
        if (!this.collision.down) {
            this.speedY += gravity;
        }
        /*else {
            this.limit = false;
            this.speedY = 0;
        }*/
        this.y += this.speedY;
    }

    checkCollision() {
        var that = this;
        var bottom = blocks.find(function (block) {
            return ((block.y + block.h / 2) - (that.y + that.h / 2) <= that.h / 2 + block.h / 2) &&
                ((block.y + block.h / 2) - (that.y + that.h / 2)) >= that.h / 2 
                && Math.abs((block.x + block.w / 2) - (that.x + that.w / 2)) < that.w / 2 + block.w / 2;
        });

        var right = blocks.find(function (block) {
            return ((block.x + block.w / 2) - (that.x + that.w / 2) <= that.w / 2 + block.w / 2) &&
                Math.abs(((block.x + block.w / 2) - (that.x + that.w / 2)) >= that.w / 2 )
                && Math.abs((block.y + block.h / 2) - (that.y + that.h / 2)) < that.h / 2 + block.h / 2;
        });

        var left = blocks.find(function (block) {
            return ((that.x + that.w / 2) - (block.x + block.w / 2) <= that.w / 2 + block.w / 2) &&
                Math.abs(((that.x + that.w / 2) - (block.x + block.w / 2)) >= that.w / 2 )
                && Math.abs((block.y + block.h / 2) - (that.y + that.h / 2)) < that.h / 2 + block.h / 2;
        });

        var up = blocks.find(function (block) {
            return ((that.y + that.h / 2) - (block.y + block.h / 2) <= that.h / 2 + block.h / 2) &&
                ((that.y + that.h / 2) - (block.y + block.h / 2)) >= that.h / 2 
                && Math.abs((block.x + block.w / 2) - (that.x + that.w / 2)) < that.w / 2 + block.w / 2;
        });

        if (bottom) {
            this.collision.down = true;
            this.y = bottom.y - this.h;
        }
        else
            this.collision.down = false;
        if (up) {
            this.collision.up = true;
            this.y = up.y + up.h;
        }
        else
            this.collision.up = false;
        if (right)
            this.collision.right = true;
        else
            this.collision.right = false;
        if (left) {
            this.collision.left = true;
        }
        else
            this.collision.left = false;

        console.log(this.collision)
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

class HorizontalBlock extends Block {
    constructor(x, y, w, h, type, color, id, dirX, editRange) {
        super(x, y, w, h, type, color, id);
        this.staticX = this.x + this.w / 2;
        this.dirX = dirX;
        this.editRange = editRange;
        this.editor = {
            x: this.x + this.editRange,
            y: this.y,
            w: this.w,
            h: this.h
        }
    }
    move() {
        if (this.x + this.w / 2 > this.staticX + this.editRange || this.x + this.w / 2 < this.staticX) {
            this.dirX *= -1;
            // console.log(this.x, this.staticX, this.editRange)
        }
        this.x += this.dirX;
    }

    edit() {
        if (mouseIsPressed) {
            if (editedBlocksID != this.id && mouseX > this.editor.x + x && mouseX < this.editor.x + this.editor.w + x && mouseY > this.editor.y + y && mouseY < this.editor.y + y + this.editor.h) {
                this.editor.x = mouseX - this.editor.w / 2 - x;
                this.editRange = this.editor.x + this.editor.w / 2 - (this.x + this.w / 2);
            }
        }

    }
}

class VerticalBlock extends Block {
    constructor(x, y, w, h, type, color, id, dirY, editRange) {
        super(x, y, w, h, type, color, id);
        this.staticY = this.y + this.h / 2;
        this.dirY = dirY;
        this.editRange = editRange;
        this.editor = {
            x: this.x,
            y: this.y + this.editRange,
            w: this.w,
            h: this.h
        }
    }
    move() {
        if (this.y + this.h / 2 > this.staticY + this.editRange || this.y + this.h / 2 < this.staticY) {
            this.dirY *= -1;
            //console.log(this.y, this.staticY, this.editRange)
        }
        this.y += this.dirY;
    }

    edit() {
        if (mouseIsPressed) {
            if (editedBlocksID != this.id && mouseY > this.editor.y + y && mouseY < this.editor.y + this.editor.h + y && mouseX > this.editor.x + x && mouseX < this.editor.x + this.editor.w + x) {
                this.editor.y = mouseY - this.editor.h / 2;
                this.editRange = this.editor.y + this.editor.h / 2 - (this.y + this.h / 2);
            }
        }

    }
}

class SandBlock extends Block {
    constructor(x, y, w, h, type, color, id) {
        super(x, y, w, h, type, color, id);
    }
    break() {

    }
}

class DeathBlock extends Block {
    constructor(x, y, w, h, type, color, id, dirY) {
        super(x, y, w, h, type, color, id);
        this.slicer = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h / 3,
            dirY: dirY
        }
    }

    move() {
        if (this.slicer.y + this.slicer.h < this.y || this.y - this.slicer.y <= this.slicer.h - this.h) {
            this.slicer.dirY *= -1
        }
        this.slicer.y += this.slicer.dirY;
    }

}

player = new Player(playerStartingX, playerStartingY, playerWidth, playerHeight);