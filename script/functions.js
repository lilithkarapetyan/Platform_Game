function drawBackground(x, y) {
    if (!mouseIsPressed)
        checkMouseMovement();
    translate(x, y)
    background(...backgroundColor)
    translate(-x, -y)
    fill(...seaColor);
    drawSea();
    translate(x, y)
    drawBlocks();
    translate(-x, -y);
    drawToolBar();
}

function drawToolBar() {
    for (var i = 0; i < tools.length; i++) {
        fill(...tools[i].color);
        if (mouseX > tools[i].x && mouseX < tools[i].x + tools[i].size && mouseY > 0 && mouseY < toolBarHeight) {
            fill(...tools[i].color)
        }
        rect(tools[i].x, 0, width / tools.length, toolBarHeight, toolBarRectCorners);
        textSize(toolBarTextSize)
        textAlign(CENTER, CENTER);
        fill(0)
        text(tools[i].f, tools[i].x, 0, width / tools.length, toolBarHeight)
    }
    strokeWeight(deleteButton.strokeWeight);
    stroke(...deleteButton.color)
    line(deleteButton.x, deleteButton.y, deleteButton.x + deleteButton.size, deleteButton.y + deleteButton.size)
    line(deleteButton.x + deleteButton.size, deleteButton.y, deleteButton.x, deleteButton.y + deleteButton.size);
    stroke(0);
    strokeWeight(1);
    noStroke();
}

function drawSea() {
    rect(0, seaStartingY, width, width - seaStartingY);
    fill(...backgroundColor);
    for (var item of seaArr) {
        ellipse(item.x, item.y, item.size)
    }
}

function checkMouseMovement() {
    if (mouseY > toolBarHeight + deleteButton.y + deleteButton.size && mouseY < 0 + height && mouseX > 0 && mouseX < 0 + width) {

        if (mouseX > width / backgroundEditRange * (backgroundEditRange - 1) && x > width - backgroundSize) {
            seaArr.map(function (item) {
                return item.x > 0 - item.size / 2 ? item.x-- : item.x = width + item.size / 2;
            });
            x--;
        }
        else if (mouseX < width / backgroundEditRange && x < 0) {
            seaArr.map(function (item) {
                return item.x < width + item.size / 2 ? item.x++ : item.x = -item.size / 2;
            });
            x++;
        }
    }
}

function toolBarFunction() {
    translate(x, y)
    var tool = Math.floor(mouseX / tools[0].size);
    //console.log(tools)
    if (tools[tool].f == 'Play') {
        character();
    }
    if (!gameStarted) {
        if (tools[tool].f == 'Stone') {
            blocks.push(new Block(tools[tool].x, tools[tool].y + toolBarHeight, stoneWidth, stoneHeight, 'Stone', stoneColor, blocks.length));
            addedBlock = true;
        }
        else if (tools[tool].f == 'Horizontal') {
            blocks.push(new HorizontalBlock(tools[tool].x, tools[tool].y + toolBarHeight, metalBlocksWidth, metalBlocksHeight, 'Horizontal', metalColor, blocks.length, horizontalBlocksSpeed, horizontalBlocksRange));
            addedBlock = true;
            console.log(blocks[blocks.length - 1])

        }
        else if (tools[tool].f == 'Vertical') {
            blocks.push(new VerticalBlock(tools[tool].x, tools[tool].y + toolBarHeight, metalBlocksWidth, metalBlocksHeight, 'Vertical', metalColor, blocks.length, verticalBlocksSpeed, verticalBlocksRange));
            addedBlock = true;
        }
        else if (tools[tool].f == 'Sand') {
            blocks.push(new SandBlock(tools[tool].x, tools[tool].y + toolBarHeight, sandWidth, sandHeight, 'Sand', sandColor, blocks.length));
            addedBlock = true;
        }
        else if (tools[tool].f == 'Death') {
            blocks.push(new Block(tools[tool].x, tools[tool].y + toolBarHeight, metalBlocksWidth, metalBlocksHeight, 'Death', metalColor, blocks.length));
            addedBlock = true;
        }
    }
    translate(-x, -y);
}


function character() {
    if (gameStarted) {
        location.reload(true)
    }
    else
        gameStarted = true;
}

//REVIEW
function playerAnimation(player) {
    translate(x, y)
    if (!gameStarted) {
        fill(...playerColor, playerOpacity)
    }
    else {
        fill(...playerColor);
        // player.move();
    }
    rect(player.x, player.y, player.w, player.h);
    translate(-x, -y)
}

//REVIEW
function drawBlocks() {
    for (var block of blocks) {
        if (block.type == 'Horizontal' || block.type == 'Vertical') {
            if (gameStarted) {
                block.move();
            }
            else {
                block.edit();
                fill(...block.color, 50);
                rect(block.editor.x, block.editor.y, block.editor.w, block.editor.h);
            }
        }
        
        else if (block.type == 'Death') {
            if (block.tempY < block.y - 15 || block.tempY > block.y) {
                block.dirY *= -1
            }
            block.tempY += block.dirY;
            fill(255, 0, 0);
            rect(block.x, block.tempY, block.w, 15)
        }
        fill(...block.color)
        rect(block.x, block.y, block.w, block.h, blocksRoundedCorners);
    }
    noStroke();
}


function editBlocks() {
    if (!gameStarted) {
        var blockIndex = blocks.findIndex(function (b) {
            return mouseX - x > b.x && mouseX - x < b.x + b.w && mouseY - y > b.y && mouseY - y < b.y + b.h;
        });
        return blockIndex
    }
}

