function preload() {
    stoneImg = loadImage(stoneImg);
    sandImg = loadImage(sandImg);
    metalImg = loadImage(metalImg);
    playerSprite = loadImage(playerSprite);
    coinImg = loadImage(coinImg);
    cupImg = loadImage(cupImg);
    slicerImg = loadImage(slicerImg);
    backgroundImg = loadImage(backgroundImg);
    hArrowImg = loadImage(hArrowImg);
    vArrowImg = loadImage(vArrowImg);

    player = new Player(playerStartingX, playerStartingY, playerWidth, playerHeight, playerSprite, playerVX, playerVY, playerA);
    cup = new Cup(cupStartingX, cupStartingY, cupWidth, cupHeight, cupImg);
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
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
            y: 0,
            w: width / toolsFunctions.length,
            h: toolBarHeight,
            color: toolBarColor,
            f: toolsFunctions[i]
        })
    }
}

function draw() {
    drawBackground(x, y);

    if (gameStarted) {
        player.play();
    }
    else {
        player.prepare();
        cup.edit();

        if (!built) {
            let url = location.href;

            let startIndex = url.indexOf("=") + 1;
            if (startIndex > 0) {
                var inputField = document.getElementById("data")
                base64 = url.slice(startIndex);
                base64 = base64.replace(/%3D/g, "");
                base64 = base64.replace(/=/g, "");
                inputField.value = base64;
                let encoded = window.atob(base64)
                var decoded = decodeURI(encoded);
                data = JSON.parse(decoded);
                if (data) {
                    construct(data)
                    built = true;
                }
            }
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
}

function mouseReleased() {
    if (editedBlocksID >= 0 && editedBlocksID != undefined) {
        blocks[editedBlocksID].deleteBlock()
        editedBlocksID = undefined;
    }
    if (editedCoinsID >= 0 && editedCoinsID != undefined) {
        editedCoinsID = undefined;
    }
    playerEditing = false;
    blockRangeEditing = false;
    cupEditing = false;
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        if (!gameStarted) {
            if (mouseX > deleteButton.x && mouseX < deleteButton.x + deleteButton.size && mouseY > deleteButton.y && mouseY < deleteButton.y + deleteButton.size && (editedBlocksID == undefined || editedBlocksID < 0) && !playerEditing && (editedCoinsID == undefined || editedCoinsID < 0) && !blockRangeEditing) {
                deleteEverything();
            }
            else {
                editedBlocksID = editBlocks();
                editedCoinsID = editCoins();
                if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !cupEditing && !blockRangeEditing && mouseX > player.x + x && mouseX < player.x + x + player.w && mouseY > player.y + y && mouseY < player.y + y + player.h) {
                    playerEditing = true;
                }
                if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !cupEditing && !playerEditing) {
                    blockRangeEditing = blocks.find(function (b) {
                        if (b.editor) {
                            return mouseX > b.editor.x + x && mouseX < b.editor.x + b.editor.w + x && mouseY > b.editor.y + y && mouseY < b.editor.y + y + b.editor.h
                        }
                    });
                }

                if ((editedBlocksID == undefined || editedBlocksID < 0) && (editedCoinsID == undefined || editedCoinsID < 0) && !blockRangeEditing && !playerEditing &&
                    mouseX > cup.x + x && mouseX < cup.x + x + cup.w && mouseY > cup.y + y && mouseY < cup.y + y + cup.h) {
                    cupEditing = true;
                }
            }

        }
        if (mouseY <= toolBarHeight) {
            toolBarFunction();
        }
    }
}


function keyPressed() {
    if (keyCode == UP_ARROW) {
        player.startJump();
    }
}

function keyReleased() {
    if (keyCode == UP_ARROW) {
        player.endJump();
    }
}