function drawBackground(x, y) {
    if (!mouseIsPressed)
        checkMouseMovement();
    translate(x, y)
    background(...bgColor)
    translate(-x, -y)
    fill(33, 118, 255);
    drawSea();
    translate(x, y)
    drawBlocks();
    translate(-x, -y)
}

function drawToolBar() {
    for (var i = 0; i < tools.length; i++) {
        fill(...tools[i].color);
        if (mouseX > tools[i].x && mouseX < tools[i].x + tools[i].size && mouseY > 0 && mouseY < height / 8) {
            fill(255, 255, 178)
        }
        rect(tools[i].x, 0, width / tools.length, height / 8, 5);
        textSize(20)
        textAlign(CENTER, CENTER);
        fill(0)
        text(tools[i].f, tools[i].x, 0, width / tools.length, height / 8)
    }
    strokeWeight(10);
    stroke(255, 150, 150)
    line(del.x, del.y, del.x + del.size, del.y + del.size)
    line(del.x + del.size, del.y, del.x, del.y + del.size);
    stroke(0)
    strokeWeight(1)
    noStroke()
}

function drawSea() {
    rect(0, height / 8 * 7, width, height / 8);
    fill(...bgColor);
    for (var item of seaArr) {
        ellipse(item.x, item.y, item.size)
    }
}

function checkMouseMovement() {
    if (mouseY > height / 8 + del.y + del.size && mouseY < 0 + height && mouseX > 0 && mouseX < 0 + width) {

        if (mouseX > width / 5 * 4 && x > -400) {
            seaArr.map(function (item) {
                return item.x > 0 - item.size / 2 ? item.x-- : item.x = width + item.size / 2;
            });
            x--;
        }
        else if (mouseX < width / 5 && x < 0) {
            seaArr.map(function (item) {
                return item.x < width + item.size / 2 ? item.x++ : item.x = -item.size / 2;
            });
            x++;
        }
    }
}





function toolBarFunction() {

    var tool = Math.floor(mouseX / tools[0].size);
    // tools[tool].color = [255, 255, 200];

    if (tools[tool].f == 'Play') {
        character();
    }
    else if (tools[tool].f == 'Stone' && !player.started) {
        blocks.push(new Block(tools[tool].x, tools[tool].y, 50, 50, 'Stone'));
        addedBlock = true;
    }
    else if (tools[tool].f == 'Horizontal' && !player.started) {
        blocks.push(new Block(tools[tool].x, tools[tool].y, 100, 25, 'Horizontal'));
        addedBlock = true;
    }
    else if (tools[tool].f == 'Vertical' && !player.started) {
        blocks.push(new Block(tools[tool].x, tools[tool].y, 100, 25, 'Vertical'));
        addedBlock = true;
    }
    else if (tools[tool].f == 'Sand' && !player.started) {
        blocks.push(new Block(tools[tool].x, tools[tool].y, 50, 50, 'Sand'));
        addedBlock = true;
    }
    else if (tools[tool].f == 'Death' && !player.started) {
        blocks.push(new Block(tools[tool].x, tools[tool].y, 100, 25, 'Death'));
        addedBlock = true;
    }
}


function character() {

    if (player.started) {
        location.reload(true)
    }
    else
        player.started = true;
}

function playerAnimation(player) {
    translate(x, y)
    if (!player.started) {
        fill(230, 230, 0, 50)
    }
    else {
        fill(230, 230, 0);
        player.move();
    }
    rect(player.x, player.y, player.w, player.h);
    translate(-x, -y)
}

function drawBlocks() {

    for (var block of blocks) {
        if (block.type == 'Stone') {
            fill(205, 82, 82)
        }
        else if (block.type == 'Horizontal') {
            if (block.x < block.staticX - 50 || block.x > block.staticX + 50) {
                block.dirX *= -1
            }
            block.x += block.dirX;
            fill(170)
        }
        else if (block.type == 'Vertical') {
            if (block.y < block.staticY - 50 || block.y > block.staticY + 50) {
                block.dirY *= -1
            }
            block.y += block.dirY;
            fill(170)
        }
        else if (block.type == 'Sand') {
            fill(255, 120, 100)
        }
        else if (block.type == 'Death') {
            if (block.tempY < block.y - 15 || block.tempY > block.y) {
                block.dirY *= -1
            }
            block.tempY += block.dirY;
            fill(255, 0, 0);
            rect(block.x, block.tempY, block.w, 15)
            fill(170)

        }
        rect(block.x, block.y, block.w, block.h, 2);
    }
    noStroke();
}

function editBlocks() {
    if (!this.started) {
        var blockIndex = blocks.findIndex(function (b) {
            return mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h;
        });
        return blockIndex
    }
}

