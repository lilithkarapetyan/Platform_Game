var id, del;
var x = 0;
var y = 0;
var bgColor = [226, 249, 255];
var seaArr = [];
var tools = [];
var blocks = [];
var addedBlock = false;
var player;
var playerJumped = false;
var toolFunctions = ['Play', 'Stone', 'Horizontal', "Vertical", "Sand", "Death", "Win"]
function setup() {
    cnv = createCanvas(800, 500);
    background(...bgColor);
    noStroke();
    for (var i = 0; i <= width / 20; i++) {
        seaArr.push({
            size: 20,
            x: i * 20 + 20 / 2,
            y: height / 8 * 7
        });
    }

    for (var i = 0; i < toolFunctions.length; i++) {
        tools.push({
            x: i * width / toolFunctions.length,
            size: width / toolFunctions.length,
            id: i,
            color: [255, 200, 61],
            f: toolFunctions[i]
        })
    }
    del = {
        x: width - 30,
        y: height / 8 + 10,
        size: 15
    }
    player = new Player(50, 200, 50, 100)
}

function draw() {
    drawBackground(x, y);
    playerAnimation(player);
    drawToolBar();
    if(player.started){
        if(playerJumped){
            player.jump();
        }
        player.fall();
    }
    else{
        player.checkCollision()
    }
    if (mouseIsPressed) {
        if (addedBlock) {
            blocks[blocks.length - 1].x = mouseX - x - blocks[blocks.length - 1].w / 2;
            blocks[blocks.length - 1].y = mouseY - blocks[blocks.length - 1].h / 2;
            if (blocks[blocks.length - 1].type == 'Horizontal') {
                blocks[blocks.length - 1].staticX = blocks[blocks.length - 1].x;
                blocks[blocks.length - 1].dirX = 1;
            } else if (blocks[blocks.length - 1].type == 'Vertical') {
                blocks[blocks.length - 1].staticY = blocks[blocks.length - 1].y;
                blocks[blocks.length - 1].dirY = 1;
            }
            else if (blocks[blocks.length - 1].type == 'Sand') {
                blocks[blocks.length - 1].break = function () {
                    console.log("broken")
                }
            }
            else if (blocks[blocks.length - 1].type == 'Death') {
                blocks[blocks.length - 1].tempY = blocks[blocks.length - 1].y;
                blocks[blocks.length - 1].dirY = 0.3;
            }
        }

        if (id >= 0) {
            blocks[id].x = mouseX - x - blocks[id].w / 2;
            blocks[id].y = mouseY - blocks[id].h / 2;
            if (blocks[id].type == 'Horizontal') {
                blocks[id].staticX = blocks[id].x;
            }
            else if (blocks[id].type == 'Vertical') {
                blocks[id].staticY = blocks[id].y;
            }
            else if (blocks[id].type == 'Death') {
                blocks[id].tempY = blocks[id].y;
            }
        }

    }
}

function mouseReleased() {
    addedBlock = false;
    id = undefined;
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && !addedBlock) {
        if (mouseY < height / 8) {
            toolBarFunction();
        }
        else {
            if (!id || id < 0)
                id = editBlocks()
        }
    }

}
