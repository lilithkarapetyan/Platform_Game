var id, del;
var x = 0;
var y = 0;
var bgColor = [220, 220, 255];
var seaArr = [];
var tools = [];
var blocks = [];
var addedBlock = false;
var toolFunctions = ['play', 'stone', 'iron', "death", "sand", "", ""]
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
            color: [100, 150, 255],
            f: toolFunctions[i]
        })
    }
    del = {
        x: width - 30,
        y: height / 8 + 10,
        size: 15
    }
}

function draw() {
    drawBackground(x, y);
    drawToolBar();

    if (mouseIsPressed) {
        if (addedBlock) {
            blocks[blocks.length - 1].x = mouseX - x - blocks[blocks.length - 1].w / 2;
            blocks[blocks.length - 1].y = mouseY - blocks[blocks.length - 1].h / 2;
        }

        if (id >= 0) {
            blocks[id].x = mouseX - x - blocks[id].w / 2;
            blocks[id].y = mouseY - blocks[id].h / 2;
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