class Parent {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }
}

class Player extends Parent {
    constructor(x, y, w, h, img, VX, VY, a, c) {
        super(x, y, w, h, img);
        this.speedX = VX;
        this.speedY = 0;
        this.accelaration = a;
        this.color = c;
        this.won = false;
        this.dead = false;
        this.eatenCoins = 0;
        this.collision = {
            right: false,
            left: false,
            up: false,
            down: false
        }
        this.dirX = 1;
        this.walkCounter = 0;
    }

    animate() {
        if (!gameStarted) {
            image(playerSprite, this.x - 15, this.y, playerWalkSprite.w, playerWalkSprite.h, ...playerStand);
        }
        else {
            fill("red")
            rect(this.x, this.y, this.w, this.h)
            image(playerSprite, this.x - 15, this.y, playerWalkSprite.w, playerWalkSprite.h, window['playerWalk' + this.walkCounter].x, window['playerWalk' + this.walkCounter].y, playerWalkSprite.w, playerWalkSprite.h);
        }
    }

    play() {
        if (!player.dead && !player.won) {
            this.move();
            this.checkCollision();
        }
    }

    prepare() {
        this.edit();
        if (!playerEditing) this.snap();

    }

    move() {

        if (keyIsDown(LEFT_ARROW) && !this.collision.left) {
            this.dirX = -1;
            this.walkCounter++;
            if (this.walkCounter == playerWalkFrames)
                this.walkCounter = 0
            if (this.x > 0) {
                this.x -= this.speedX;
                if (x < 0) {
                    x += this.speedX
                }
            }
        }
        else if (keyIsDown(RIGHT_ARROW) && !this.collision.right) {
            this.walkCounter++;
            this.dirX = 1;
            if (this.walkCounter == playerWalkFrames)
                this.walkCounter = 0
            if (this.x + this.w <= backgroundSize) {
                this.x += this.speedX
                if (this.x + x + this.w / 2 >= canvasWidth / 2) {
                    x -= this.speedX
                }

            }


        }
        if (this.speedY < 6)
            this.speedY += gravity;
        this.y += this.speedY;

        if (this.collision.down) {
            this.speedY = 0;
        }

        if (this.y >= seaStartingY) {
            this.die();
        }
    }

    startJump() {
        if (this.collision.down) {
            this.y -= 2;
            this.speedY = -12.0;
            this.collision.down = false;
        }
    }

    endJump() {
        if (this.speedY < -6.0) {
            this.speedY = -6.0;
        }
    }
    checkCollision() {

        var that = this;
        var arrayY = [];
        var bottomColls = blocks.filter(function (block) {
            var a = block.dirY ? block.dirY : 0;
            return ((block.y + block.h / 2) - (that.y + that.h / 2) <= that.h / 2 + block.h / 2 + a) &&
                ((block.y + block.h / 2) - (that.y + that.h / 2)) >= that.h / 2
                && Math.abs((block.x + block.w / 2) - (that.x + that.w / 2)) < that.w / 2 + block.w / 2 + that.speedX;
        });

        bottomColls.forEach(function (block) { arrayY.push(block.y) });

        var index = arrayY.indexOf(Math.min(...arrayY))
        var bottom = bottomColls[index];

        var right = blocks.find(function (block) {
            return ((block.x + block.w / 2) - (that.x + that.w / 2) <= that.w / 2 + block.w / 2) &&
                ((block.x + block.w / 2) - (that.x + that.w / 2) >= that.w / 2)
                && Math.abs((block.y + block.h / 2) - (that.y + that.h / 2)) < that.h / 2 + block.h / 2 - that.speedY;
        });

        var left = blocks.find(function (block) {
            return ((that.x + that.w / 2) - (block.x + block.w / 2) <= that.w / 2 + block.w / 2) &&
                ((that.x + that.w / 2) - (block.x + block.w / 2)) >= that.w / 2
                && Math.abs((block.y + block.h / 2) - (that.y + that.h / 2)) < that.h / 2 + block.h / 2 - that.speedY;
        });

        var up = blocks.find(function (block) {
            return ((that.y + that.h / 2) - (block.y + block.h / 2) <= that.h / 2 + block.h / 2) &&
                ((that.y + that.h / 2) - (block.y + block.h / 2)) >= that.h / 2
                && Math.abs((block.x + block.w / 2) - (that.x + that.w / 2)) < that.w / 2 + block.w / 2 - 2 * that.speedX;
        });

        if (bottom) {
            this.collision.down = true;
            this.y = bottom.y - this.h;
            if (bottom.type == "Horizontal" && !left && !right) {
                this.x += bottom.dirX
            }
            else if (bottom.type == "Sand") {
                bottom.break()
            }
        }
        else
            this.collision.down = false;
        if (up) {
            this.collision.up = true;
            if (!bottom)
                this.y = up.y + up.h;
        }
        else
            this.collision.up = false;
        if (right) {
            if (bottom) {
                if (right.x != bottom.x && right.y != bottom.y) {
                    //console.log(right, bottom)
                    this.collision.right = true;
                    if (!this.collision.left && right.type == "Horizontal") {
                        this.x = right.x - this.w
                    }

                }
                else {
                    this.collision.right = false;
                }
            } else if (!bottom) {
                this.collision.right = true;
                if (!this.collision.left && right.type == "Horizontal") {
                    this.x = right.x - this.w
                }
            }
        }
        else
            this.collision.right = false;
        if (left) {
            if (bottom) {
                //left.x != bottom.x && left.y != bottom.y
                if (left.x != bottom.x && left.y != bottom.y) {
                    this.collision.left = true;
                    if (!this.collision.right) {

                        this.x = left.x + left.w;
                    }
                }
                else {
                    this.collision.left = false;
                }
            } else if (!bottom) {
                this.collision.left = true;
                if (!this.collision.right && left.type == "Horizontal") {
                    this.x = left.x + left.w;
                }
            }

        }
        else {
            this.collision.left = false;
        }

        if (this.collision.left && this.collision.right && this.collision.bottom) {
            this.die();
        }

        //coin-part
        var eaten = coins.filter(function (coin) {
            return that.x + that.w > coin.x && that.x < coin.x + coin.w && that.y + that.h > coin.y && that.y < coin.y + coin.h
        });
        eaten.forEach(function (c) {
            coins.splice(coins.indexOf(c), 1)
            player.eatenCoins++;
        });

        if (this.x + this.w > cup.x && this.x < cup.x + cup.w && this.y + this.h > cup.y && this.y < cup.y + cup.h && cup.available) {
            this.win();
        }
    }

    snap() {
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
                block.x = this.x - block.w;
            updateBlocksCoordinates(b)
        }


    }

    edit() {
        if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !cupEditing && !blockRangeEditing && mouseX > this.x + x && mouseX < this.x + x + this.w && mouseY > this.y + y && mouseY < this.y + y + this.h && mouseIsPressed) {
            this.x = mouseX - this.w / 2 - x;
            this.y = mouseY - this.h / 2 - y;
            playerEditing = true;
        }
        else {
            playerEditing = false;
        }
    }

    win() {
        this.won = true;
    }

    die() {
        this.dead = true;
    }
}

class Block extends Parent {
    constructor(x, y, w, h, img, type, color, id) {
        super(x, y, w, h, img);
        this.type = type;
        this.color = color;
        this.id = id;
    }

    deleteBlock() {
        if (this.x + this.w / 2 > deleteButton.x - x && this.x + this.w / 2 < deleteButton.x - x + deleteButton.size && this.y + this.h / 2 > deleteButton.y - y && this.y + this.h / 2 < deleteButton.y - y + deleteButton.size) {
            blocks.splice(blocks.indexOf(this), 1)
        }
    }
}

class HorizontalBlock extends Block {
    constructor(x, y, w, h, img, type, color, id, dirX, editRange) {
        super(x, y, w, h, img, type, color, id);
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
        }
        this.x += this.dirX;
    }

    edit() {
        if (mouseIsPressed) {
            if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !cupEditing && !playerEditing && mouseX > this.editor.x + x && mouseX < this.editor.x + this.editor.w + x && mouseY > this.editor.y + y && mouseY < this.editor.y + y + this.editor.h && mouseX - x - this.editor.w / 2 >= this.x + this.w) {
                blockRangeEditing = true;
                this.editor.x = mouseX - this.editor.w / 2 - x;
                this.editRange = this.editor.x + this.editor.w / 2 - (this.x + this.w / 2);
            }
        }

    }
}

class VerticalBlock extends Block {
    constructor(x, y, w, h, img, type, color, id, dirY, editRange) {
        super(x, y, w, h, img, type, color, id);
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
        if (this.y + this.h / 2 > this.staticY + this.editRange || this.y + this.h / 2 < this.staticY || player.collision.top) {
            this.dirY *= -1;
        }
        this.y += this.dirY;
    }

    edit() {
        if (mouseIsPressed) {
            if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !cupEditing && !playerEditing && mouseY > this.editor.y + y && mouseY < this.editor.y + this.editor.h + y && mouseX > this.editor.x + x && mouseX < this.editor.x + this.editor.w + x && mouseY - this.editor.h / 2 >= this.y + this.h) {
                blockRangeEditing = true;
                this.editor.y = mouseY - this.editor.h / 2 + y;
                this.editRange = this.editor.y + this.editor.h / 2 - (this.y + this.h / 2);
            }
        }

    }
}

class SandBlock extends Block {
    constructor(x, y, w, h, type, color, id) {
        super(x, y, w, h, type, color, id);
        this.strength = 5;
        this.startedBreaking = false;
    }
    break() {
        if (!this.startedBreaking) {
            this.startedBreaking = true;
            sandBreaker(this)
        }
    }
}

class DeathBlock extends Block {
    constructor(x, y, w, h, img, type, color, id, dirY) {
        super(x, y, w, h, img, type, color, id);
        this.slicer = {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h / 3,
            dirY: dirY
        }
    }

    move() {
        if (this.slicer.y + this.slicer.h < this.y || this.y - this.slicer.y < this.slicer.h - this.h) {
            this.slicer.dirY *= -1
        }
        this.slicer.y += this.slicer.dirY;
    }

    kill() {
        if (Math.abs((this.slicer.x + this.slicer.w / 2) - (player.x + player.w / 2)) < this.slicer.w / 2 + player.w / 2 && player.y + player.h > this.slicer.y && player.y + player.h < this.slicer.y + this.slicer.h) {
            player.color = [255, 0, 0];
            player.die()
        }
        else {
            player.color = playerColor;
        }
    }

}

class Coin extends Parent {
    constructor(x, y, w, h, img, color) {
        super(x, y, w, h, img);
        this.color = color;
    }
}

class Cup extends Parent {
    constructor(x, y, w, h, img, color) {
        super(x, y, w, h, img);
        this.color = color;
        this.opacity = 0.5;
        this.available = false
    }
    checkAvailablity() {
        if (coins.length == 0) {
            this.alpha = 1;
            this.available = true;
        }
        else {
            this.available = false;
            this.alpha = 0.5;
        }
    }

    drawCup() {
        this.checkAvailablity();
        //fill(...this.color, this.opacity);
        tint(255, this.alpha * 255)
        image(cupImg, this.x, this.y, this.w, this.h);
        tint(255, 255);
    }

    edit() {
        if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !blockRangeEditing && !playerEditing &&
            mouseX > this.x + x && mouseX < this.x + x + this.w && mouseY > this.y + y && mouseY < this.y + y + this.h && mouseIsPressed) {
            this.x = mouseX - this.w / 2 - x;
            this.y = mouseY - this.h / 2 - y;
            cupEditing = true;
        }
        else {
            cupEditing = false;
        }
    }
}


player = new Player(playerStartingX, playerStartingY, playerWidth, playerHeight, playerSprite, playerVX, playerVY, playerA, playerColor);
cup = new Cup(cupStartingX, cupStartingY, cupWidth, cupHeight, cupImg, cupColor);