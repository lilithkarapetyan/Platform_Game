var x = 0;
var y = 0;
var bgColor = [220, 220, 255];
var seaArr = [];
var tools = [];
var blocks = [];
var addedBlock = false;
var toolFunctions = ['play', 'stone', 'sand', "death", "", "", ""]
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
    for (var i = 0; i < 7; i++) {
        tools.push({
            x: i * width / 7,
            size: width / 7,
            id: i,
            color: [100, 150, 255],
            f: toolFunctions[i]
        })
    }
}

function draw() {
    drawBackground(x, y);
    drawToolBar();

    if (mouseIsPressed) {
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && !addedBlock) {
            if (mouseY < height / 8) {
                toolBarFunction();
            }
            else {
                if (!id || id < 0)
                    var id = editBlocks()
            }
        }
        if (id) {
            blocks[id].x = mouseX - x;
            blocks[id].y = mouseY;
        }
        if (addedBlock) {
            blocks[blocks.length - 1].x = mouseX - x;
            blocks[blocks.length - 1].y = mouseY;
        }


    }
}

function mouseReleased() {
    addedBlock = false;
    
}