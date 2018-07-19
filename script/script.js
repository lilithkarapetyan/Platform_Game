function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(...backgroundColor);
    noStroke();
    for (var i = 0; i <= width / waveSize; i++) {
        seaArr.push({
            size: waveSize,
            x: i * waveSize + waveSize / 2,
            y: seaStartingY
        });
    }

    for (var i = 0; i < toolsFunctions.length; i++) {
        tools.push({
            x: i * width / toolsFunctions.length,
            size: width / toolsFunctions.length,
            y: 0,
            id: i,
            color: toolBarColor,
            f: toolsFunctions[i]
        })
    }
}

function draw() {
    drawBackground(x, y);
    player.animate()
    if (gameStarted) {
        player.play();
    }
    else {
        player.prepare();
    }
    if (mouseIsPressed) {
        if (editedBlocksID >= 0) {
            blocks[editedBlocksID].x = mouseX - x - blocks[editedBlocksID].w / 2;
            blocks[editedBlocksID].y = mouseY - y - blocks[editedBlocksID].h / 2;
            updateBlocksCoordinates(editedBlocksID)
        }
        if (editedCoinsID >= 0) {
            coins[editedCoinsID].x = mouseX - x - coins[editedCoinsID].w / 2;
            coins[editedCoinsID].y = mouseY - y - coins[editedCoinsID].h / 2;
        }
    }
}

function mouseReleased() {
    if (editedBlocksID >= 0 && editedBlocksID != undefined) {
        blocks[editedBlocksID].deleteBlock()
        editedBlocksID = undefined;
    }
    if (editedCoinsID >= 0 && editedCoinsID != undefined) {
        editedCoinsID = undefined;
    }
    blockRangeEditing = false;
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        restart()
        if (mouseY <= toolBarHeight) {
            toolBarFunction();
        }
        else {
            if (!gameStarted) {
                editedBlocksID = editBlocks();
                editedCoinsID = editCoins();
            }
        }
    }
}


function keyPressed(){
    if(keyCode == UP_ARROW){
        player.startJump()
    }
}

function keyReleased(){
    player.endJump()
}