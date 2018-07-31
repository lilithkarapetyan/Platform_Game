function drawBackground(x, y) {
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
        rect(tools[i].x, 0, tools[i].w, tools[i].h, toolBarRectCorners);
        if (tools[i].f == "Stone") {
            var img = stoneImg;
            var imageWidth = stoneWidth;
            var imageHeight = stoneHeight;
        }
        else if (tools[i].f == "Horizontal" || tools[i].f == "Vertical" || tools[i].f == "Death") {
            var img = metalImg;
            var imageWidth = metalBlocksWidth;
            var imageHeight = metalBlocksHeight;
        }
        else if (tools[i].f == "Sand") {
            var img = sandImg;
            var imageWidth = sandWidth;
            var imageHeight = sandHeight;
        }
        else if (tools[i].f == "Coin") {
            var img = coinImg;
            var imageWidth = coinSize;
            var imageHeight = coinSize;
        }
        else {
            img = undefined;
        }

        if (img) {
            var scale = imageWidth > imageHeight ? tools[i].w / imageWidth : tools[i].h / imageHeight
            if (imageWidth > imageHeight) {
                var horGap = toolBarImagesGap;
                var vertGap = 0;
            }
            else if (imageWidth == imageHeight) {
                var horGap = toolBarImagesGap;
                var vertGap = toolBarImagesGap;
            }
            else {
                var horGap = 0;
                var vertGap = toolBarImagesGap;
            }
            imageMode(CENTER)
            image(img, tools[i].x + tools[i].w / 2, tools[i].y + tools[i].h / 2, imageWidth * scale - 2 * horGap, imageHeight * scale - 2 * vertGap);
            imageMode(CORNER)
        }
        else {
            textSize(toolBarTextSize);
            textAlign(CENTER, CENTER);
            fill(0)
            if (tools[i].f == "Play") {
                text(gameStarted ? "Stop" : tools[i].f, tools[i].x, 0, width / tools.length, toolBarHeight)
            }
            else
                text(tools[i].f, tools[i].x, 0, width / tools.length, toolBarHeight)
        }
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
    var tool = Math.floor(mouseX / tools[0].w);
    if (tools[tool].f == 'Play') {
        start();
    }
    else if (tools[tool].f == "Save" && player.won) {
        //data = fix();
        saveCoords(data);
        //construct(data);
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
        construct(data);
        gameStarted = false;
    }
    else {
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
        if (i >= 0) {
            blocks[i].strength--;
            if (blocks[i].strength == 0) {
                blocks.splice(i, 1)
                clearInterval(breakInt)
            }
        }
        else
            clearInterval(breakInt);
    }, 1000)

}

function deleteEverything() {
    blocks = [];
    player.x = playerStartingX;
    player.y = playerStartingY;
    coins = [];
    player.speedY = 0;
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

    data.cup = { x: cup.x, y: cup.y };
    data.camera = { x: x, y: y };

    return data
}

function saveCoords(data) {
    var json = JSON.stringify(data);
    let url = location.href
    if (url.indexOf("?") >= 0) {
        url = url.slice(0, url.indexOf("?"));
    }
    /*var base36 = parseInt(encodeURI(json), 36);
    alert(base36)*/
    var base64 = window.btoa(encodeURI(json))
    //  alert(window.atob(base64))
    location.href = url + "?data=" + base64;

    //console.log(encoded);
    //var decoded = decodeURI(encoded)
    //console.log(decoded)
    ///console.log(JSON.parse(decoded))
}


function construct(data) {
    blocks = [];
    coins = [];
    data.blocks.forEach(function (b) {
        if (b.type == 'Stone') {
            //                    _____block.x____,_______________block.y_____________,__block.w__,__block.h__,block.type, block.color,__block.id__
            blocks.push(new Block(b.x, b.y, stoneWidth, stoneHeight, stoneImg, 'Stone', stoneColor, blocks.length));
        }
        else if (b.type == 'Horizontal') {
            //                                                                                                                                                                  block.dirX             block.editRange
            blocks.push(new HorizontalBlock(b.x, b.y, metalBlocksWidth, metalBlocksHeight, metalImg, 'Horizontal', metalColor, blocks.length, horizontalBlocksSpeed, b.editRange));
        }
        else if (b.type == 'Vertical') {
            //                                                                                                                                                              block.dirY           block.editRange
            blocks.push(new VerticalBlock(b.x, b.y, metalBlocksWidth, metalBlocksHeight, metalImg, 'Vertical', metalColor, blocks.length, verticalBlocksSpeed, b.editRange));
        }
        else if (b.type == 'Sand') {

            blocks.push(new SandBlock(b.x, b.y, sandWidth, sandHeight, sandImg, 'Sand', sandColor, blocks.length));
        }
        else if (b.type == 'Death') {
            //                                                                                                                                                        block.slicer.dirY
            blocks.push(new DeathBlock(b.x, b.y, metalBlocksWidth, metalBlocksHeight, metalImg, 'Death', metalColor, blocks.length, deathBlockSlicerV));
        }
    });

    data.coins.forEach(function (c) {
        coins.push(new Coin(c.x, c.y, coinSize, coinSize, undefined, coinColor))
    });

    player = new Player(data.player.x, data.player.y, playerWidth, playerHeight, playerSprite, playerVX, playerVY, playerA, playerColor);
    cup = new Cup(data.cup.x, data.cup.y, cupWidth, cupHeight, cupImg, cupColor);
    x = data.camera.x;
    y = data.camera.y;

}