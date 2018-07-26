function drawBackground(x, y) {
    if (!mouseIsPressed)
        checkMouseMovement();
    for (var i = 0; i <= backgroundSize / width; i++) {
        if (x > -width)
            image(backgroundImg, x + i * width, y, width, height)
    }
    fill(...seaColor);
    drawSea();
    translate(x, y);
    player.animate()
    drawBlocks();
    cup.drawCup();
    translate(-x, -y);
    drawToolBar();
}

function drawToolBar() {
    for (var i = 0; i < tools.length; i++) {
        fill(...tools[i].color);
        if (tools[i].f == "Save" && !player.won) {
            fill(...tools[i].color, 50);
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
            x -= 2;
        }
        else if (mouseX < width / backgroundEditRange && x < 0) {
            seaArr.map(function (item) {
                return item.x < width + item.size / 2 ? item.x++ : item.x = -item.size / 2;
            });
            x += 2;
        }
    }
}

function toolBarFunction() {
    var tool = Math.floor(mouseX / tools[0].size);
    if (tools[tool].f == 'Play') {
        
        start();
        if (x > width - backgroundSize && playerStartingX - player.x <= 0)
            x = playerStartingX - player.x
    } else if (tools[tool].f == "Save" && player.won) {
        saveCoords();
    }
    if (!gameStarted) {
        if (tools[tool].f == 'Stone') {
            //                    _____block.x____,_______________block.y_____________,__block.w__,__block.h__,block.type, block.color,__block.id__
            blocks.push(new Block(tools[tool].x - x, tools[tool].y - y + toolBarHeight, stoneWidth, stoneHeight, stoneImg, 'Stone', stoneColor, blocks.length));
        }
        else if (tools[tool].f == 'Horizontal') {
            //                                                                                                                                                                  block.dirX             block.editRange
            blocks.push(new HorizontalBlock(tools[tool].x - x, tools[tool].y - y + toolBarHeight, metalBlocksWidth, metalBlocksHeight, metalImg, 'Horizontal', metalColor, blocks.length, horizontalBlocksSpeed, horizontalBlocksRange));
        }
        else if (tools[tool].f == 'Vertical') {
            //                                                                                                                                                              block.dirY           block.editRange
            blocks.push(new VerticalBlock(tools[tool].x - x, tools[tool].y + toolBarHeight - y, metalBlocksWidth, metalBlocksHeight, metalImg, 'Vertical', metalColor, blocks.length, verticalBlocksSpeed, verticalBlocksRange));
        }
        else if (tools[tool].f == 'Sand') {

            blocks.push(new SandBlock(tools[tool].x - x, tools[tool].y - y + toolBarHeight, sandWidth, sandHeight, sandImg, 'Sand', sandColor, blocks.length));
        }
        else if (tools[tool].f == 'Death') {
            //                                                                                                                                                        block.slicer.dirY
            blocks.push(new DeathBlock(tools[tool].x - x, tools[tool].y - y + toolBarHeight, metalBlocksWidth, metalBlocksHeight, metalImg, 'Death', metalColor, blocks.length, deathBlockSlicerV));
        }
        else if (tools[tool].f == 'Coin') {
            coins.push(new Coin(tools[tool].x - x, tools[tool].y - y + toolBarHeight, coinSize, coinSize, undefined, coinColor));
        }
    }
}

function start() {
    if (gameStarted) {

        gameStarted = false;
        player.x = data.player.x;
        player.y = data.player.y;

        player.won = false;
        player.dead = false;
        player.speedY = playerVY;;
        player.eatenCoins = 0;
        player.walkCounter = 0
        console.log(player)
    }
    else{
        console.log(player, "start")
        gameStarted = true;
        data = fix();
    }
}

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

            if (gameStarted) {
                block.move();
                block.kill();
            }
            image(slicerImg, block.slicer.x, block.slicer.y - block.slicer.h, block.slicer.w, block.slicer.h * 2)
        }
        fill(...block.color)
        if (block.img) {
            image(block.img, block.x, block.y, block.w, block.h, blocksRoundedCorners)
        }
        else
            rect(block.x, block.y, block.w, block.h, blocksRoundedCorners);

        if (block.type == 'Sand') {
            fill(255)
            textAlign(CENTER, CENTER)
            text(block.strength, block.x, block.y, block.w, block.h)
        }
    }
    noStroke();

    coins.forEach(function (coin) {
        image(coinImg, coin.x, coin.y, coin.h, coin.w);
    });
}

function editBlocks() {
    var blockIndex = blocks.findIndex(function (b) {
        return mouseX - x > b.x && mouseX - x < b.x + b.w && mouseY - y > b.y && mouseY - y < b.y + b.h && !playerEditing && (editedCoinsID == undefined || editedCoinsID < 0);
    });
    return blockIndex
}

function editCoins() {
    var coinIndex = coins.findIndex(function (b) {
        return mouseX - x > b.x && mouseX - x < b.x + b.w && mouseY - y > b.y && mouseY - y < b.y + b.h && !playerEditing && (editedBlocksID == undefined || editedBlocksID < 0);
    });
    return coinIndex
}

function updateBlocksCoordinates(i) {
    if (blocks[i].type == 'Horizontal') {
        blocks[i].editor.x = blocks[i].x + blocks[i].editRange;
        blocks[i].editor.y = blocks[i].y;
        blocks[i].staticX = blocks[i].x + blocks[i].w / 2;

    }
    else if (blocks[i].type == 'Vertical') {
        blocks[i].editor.x = blocks[i].x;
        blocks[i].editor.y = blocks[i].y + blocks[i].editRange;
        blocks[i].staticY = blocks[i].y + blocks[i].h / 2;
    }
    else if (blocks[i].type == 'Death') {
        blocks[i].slicer.y = blocks[i].y - blocks[i].slicer.h;
        blocks[i].slicer.x = blocks[i].x;
    }


}

function sandBreaker(obj) {
    var breakInt = setInterval(function () {
        var i = blocks.indexOf(obj)
        blocks[i].strength--;
        if (blocks[i].strength == 0) {
            blocks.splice(i, 1)
            clearInterval(breakInt)
        }
    }, 1000)

}

function restart() {
    if (mouseX > deleteButton.x && mouseX < deleteButton.x + deleteButton.size && mouseY > deleteButton.y && mouseY < deleteButton.y + deleteButton.size && (editedBlocksID == undefined || editedBlocksID < 0) && !playerEditing && (editedCoinsID == undefined || editedCoinsID < 0) && !blockRangeEditing) {
        blocks = [];
        player.x = playerStartingX;
        player.y = playerStartingY;
        coins = [];
        player.speedY = 0

    }
}

function fix() {
    var data = {};
    data.blocks = [];
    for (var i = 0; i < blocks.length; i++) {
        data.blocks[i] = {
            x: blocks[i].x,
            y: blocks[i].y,
            type: blocks[i].type,
            editRange: blocks[i].editRange ? blocks[i].editRange : undefined
        }
    }
    data.player = { x: player.x, y: player.y };
    data.coins = [];

    for (var i = 0; i < coins.length; i++) {
        data.coins[i] = {
            x: coins[i].x,
            y: coins[i].y,
        }
    }

    data.iceCream = { x: cup.x, y: cup.y }

    return data
}

function saveCoords() {
    var json = JSON.stringify(data)
    var encoded = encodeURI(json)
    var t = location.href + "?data="+encoded;
    console.log(t);
    //console.log(encoded);
    //var decoded = decodeURI(encoded)
    //console.log(decoded)
    ///console.log(JSON.parse(decoded))
}