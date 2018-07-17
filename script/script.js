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
    if (mouseIsPressed) {
        if (editedBlocksID >= 0) {
            blocks[editedBlocksID].x = mouseX - x - blocks[editedBlocksID].w / 2;
            blocks[editedBlocksID].y = mouseY - blocks[editedBlocksID].h / 2;
        }
    }
}

function mouseReleased() {
    if (editedBlocksID >= 0) {
        updateBlocksCoordinates(editedBlocksID)
        editedBlocksID = undefined;
    }
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        if (mouseY <= toolBarHeight) {
            toolBarFunction();
        }
        else {
            if (!gameStarted) {
                editedBlocksID = editBlocks();
            }
        }
    }

}
