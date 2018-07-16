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
    playerAnimation(player);
    
    /*if(gameStarted){
        if(playerJumped){
            player.jump();
        }
        player.fall();
    }
    else{
        player.checkCollision()
    }*/

    if (mouseIsPressed) {
        if (addedBlock) {
            blocks[blocks.length - 1].x = tools[Math.floor(mouseX / tools[0].size)].x;
            blocks[blocks.length - 1].y = tools[Math.floor(mouseX / tools[0].size)].y + toolBarHeight;
            /*if (blocks[blocks.length - 1].type == 'Horizontal') {
                blocks[blocks.length - 1].staticX = blocks[blocks.length - 1].x;
                blocks[blocks.length - 1].dirX = 1;
            } else if (blocks[blocks.length - 1].type == 'Vertical') {
                blocks[blocks.length - 1].staticY = blocks[blocks.length - 1].y;
                blocks[blocks.length - 1].dirY = 1;
            }*/
             if (blocks[blocks.length - 1].type == 'Sand') {
                blocks[blocks.length - 1].break = function () {
                    console.log("broken")
                }
            }
            else if (blocks[blocks.length - 1].type == 'Death') {
                blocks[blocks.length - 1].tempY = blocks[blocks.length - 1].y;
                blocks[blocks.length - 1].dirY = 0.3;
            }
        }

        if (editedBlocksID >= 0) {
            blocks[editedBlocksID].x = mouseX - x - blocks[editedBlocksID].w / 2;
            blocks[editedBlocksID].y = mouseY - blocks[editedBlocksID].h / 2;
            if (blocks[editedBlocksID].type == 'Horizontal' || blocks[editedBlocksID].type == 'Vertical') {
                blocks[editedBlocksID].editor.x = blocks[editedBlocksID].x + blocks[editedBlocksID].editRange - blocks[editedBlocksID].editor.w/2;
                blocks[editedBlocksID].editor.y = blocks[editedBlocksID].y;
            }
            else if (blocks[editedBlocksID].type == 'Death') {
                blocks[editedBlocksID].tempY = blocks[editedBlocksID].y;
            }
        }

    }
}

function mouseReleased() {
    addedBlock = false;
    editedBlocksID = undefined;
    for(var i in blocks){
        blocks[i].deleteBlock()
    }
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && !addedBlock) {
        if (mouseY <= toolBarHeight) {
            toolBarFunction();
        }
        else {
            if (!editedBlocksID || editedBlocksID < 0)
                editedBlocksID = editBlocks()
        }
    }

}
