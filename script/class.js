class Parent {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Player extends Parent {
    constructor(x, y, w, h, VX, VY, a, c) {
        super(x, y, w, h);
        this.speedX = VX;
        this.speedY = 0;
        this.accelaration = a;
        this.limit = false;
        this.color = c;
        this.eatenCoins = 0;
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
            fill(...this.color, playerOpacity);
        }
        else {
            fill(...this.color);
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

    prepare() {
        this.edit();
        if (!playerEditing) this.snap();

    }

    move() {
        if (keyIsDown(LEFT_ARROW) && !this.collision.left) {
            if (this.x > 0) {
                this.x -= this.speedX;
                if (x < 0) {
                    x += this.speedX
                }
            }
        }
        else if (keyIsDown(RIGHT_ARROW) && !this.collision.right) {
            if (this.x + this.w <= backgroundSize) {
                this.x += this.speedX
                if (this.x + x + this.w / 2 >= canvasWidth / 2) {
                    x -= this.speedX
                }

            }


        }


        this.speedY += gravity;
        this.y += this.speedY;

        if (this.collision.bottom) {
            //this.y = 175.0;
            velocityY = 0.0;
        }
        
        /*
        if (keyIsDown(UP_ARROW) && !this.collision.up && !this.limit) {
            if (this.speedY < -5) {
                this.limit = true;
            } else
            this.speedY -= this.accelaration;
        }

        if (!this.collision.bottom) {
            this.y += this.speedY
            this.speedY += gravity;
        }
        else {
            this.speedY = -VX
        }
        */


        /*
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');

        var positionX = 100.0;
        var positionY = 175.0;
        var velocityX = 4.0;
        var velocityY = 0.0;
        var gravity = 0.5;
        var onGround = false;

        window.addEventListener("mousedown", StartJump, false);
        window.addEventListener("mouseup", EndJump, false);

        Loop();
        
        function StartJump()
        {
            if(onGround)
            {
                velocityY = -12.0;
                onGround = false;
            }
        }

        function EndJump()
        {
            if(velocityY < -6.0)
                velocityY = -6.0;
        }

        function Loop()
        {
            Update();
            Render();
            window.setTimeout(Loop, 33);    
        }
        
        function Update()
        {
            velocityY += gravity;
            positionY += velocityY;
            positionX += velocityX;
            
            if(positionY > 175.0)
            {
                positionY = 175.0;
                velocityY = 0.0;
                onGround = true;
            }
            
            if(positionX < 10 || positionX > 190)
            velocityX *= -1;
        }
        
        function Render()
        {
            ctx.clearRect(0, 0, 200, 200);
            ctx.beginPath();
            ctx.moveTo(0,175);
            ctx.lineTo(200,175);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(positionX - 10, positionY - 20);
            ctx.lineTo(positionX + 10, positionY - 20);
            ctx.lineTo(positionX + 10, positionY);
            ctx.lineTo(positionX - 10, positionY);
            ctx.closePath();
            ctx.stroke(); 
        }
        
        */
    }
    
    startJump()
    {
        if (this.collision.bottom) {
            this.speedY = -12.0;
        }
    }

    endJump()
    {
        if (this.speedY < -6.0)
            this.speedY = -6.0;
    }
    checkCollision() {

        var that = this;
        var arrayY = [];
        var bottomColls = blocks.filter(function (block) {
            return ((block.y + block.h / 2) - (that.y + that.h / 2) <= that.h / 2 + block.h / 2) &&
                ((block.y + block.h / 2) - (that.y + that.h / 2)) >= that.h / 2
                && Math.abs((block.x + block.w / 2) - (that.x + that.w / 2)) < that.w / 2 + block.w / 2 - that.speedX;
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
                && Math.abs((block.x + block.w / 2) - (that.x + that.w / 2)) < that.w / 2 + block.w / 2 - that.speedX;
        });

        if (bottom) {
            this.collision.down = true;
            this.y = bottom.y - this.h - 1;
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
                this.y = up.y + up.h + 1;
        }
        else
            this.collision.up = false;
        if (right) {
            this.collision.right = true;
            if (!left && right.type == "Horizontal") {
                this.x = right.x - this.w - 1
            }
        }
        else
            this.collision.right = false;
        if (left) {
            this.collision.left = true;
            if (!right && left.type == "Horizontal") {
                this.x = left.x + left.w + 1;
            }
        }
        else
            this.collision.left = false;

        //coin-part
        var eaten = coins.filter(function (coin) {
            return that.x + that.w > coin.x && that.x < coin.x + coin.w && that.y + that.h > coin.y && that.y < coin.y + coin.h
        });
        eaten.forEach(function (c) {
            coins.splice(coins.indexOf(c), 1)
            player.eatenCoins++;
        });

        /*if (this.eatenCoins && coins.length == 0) {
            fill(0)
            text(this.eatenCoins, this.x, this.y, this.w, this.h)
        }*/
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
        if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !blockRangeEditing && mouseX > this.x + x && mouseX < this.x + x + this.w && mouseY > this.y + y && mouseY < this.y + y + this.h && mouseIsPressed) {
            this.x = mouseX - this.w / 2 - x;
            this.y = mouseY - this.h / 2 - y;
            playerEditing = true;
        }
        else {
            playerEditing = false;
        }
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
        }
        this.x += this.dirX;
    }

    edit() {
        if (mouseIsPressed) {
            if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !playerEditing && mouseX > this.editor.x + x && mouseX < this.editor.x + this.editor.w + x && mouseY > this.editor.y + y && mouseY < this.editor.y + y + this.editor.h && mouseX - x - this.editor.w / 2 >= this.x + this.w) {
                blockRangeEditing = true;
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
        if (this.y + this.h / 2 > this.staticY + this.editRange || this.y + this.h / 2 < this.staticY || player.collision.top) {
            this.dirY *= -1;
        }
        this.y += this.dirY;
    }

    edit() {
        if (mouseIsPressed) {
            if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !playerEditing && mouseY > this.editor.y + y && mouseY < this.editor.y + this.editor.h + y && mouseX > this.editor.x + x && mouseX < this.editor.x + this.editor.w + x && mouseY - this.editor.h / 2 >= this.y + this.h) {
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
        if (this.slicer.y + this.slicer.h < this.y || this.y - this.slicer.y < this.slicer.h - this.h) {
            this.slicer.dirY *= -1
        }
        this.slicer.y += this.slicer.dirY;
    }

    kill() {
        if (Math.abs((this.slicer.x + this.slicer.w / 2) - (player.x + player.w / 2)) < this.slicer.w / 2 + player.w / 2 && player.y + player.h > this.slicer.y && player.y + player.h < this.slicer.y + this.slicer.h) {
            player.color = [255, 0, 0]
        }
        else {
            player.color = playerColor;
        }
    }

}

class Coin extends Parent {
    constructor(x, y, w, h, color) {
        super(x, y, w, h);
        this.color = color;
    }
}

class Cup extends Parent {
    constructor(x, y, w, h, color) {
        super(x, y, w, h);
        this.color = color;
        this.opacity = 50;
    }
    checkAvailablity() {
        if (coins.length == 0) {
            this.opacity = 100;
        }
        else {
            this.opacity = 50;
        }
    }

    drawCup() {
        this.checkAvailablity();
        fill(...this.color, this.opacity);
        rect(this.x, this.y, this.w, this.h);
    }
}


player = new Player(playerStartingX, playerStartingY, playerWidth, playerHeight, playerVX, playerVY, playerA, playerColor);
cup = new Cup(cupStartingX, cupStartingY, cupWidth, cupHeight, cupColor);