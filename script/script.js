var x = 0;
var y = 0;
var bgColor = [220, 220, 255];
var seaArr = [];
var tools = [];
var toolFunctions = ['play', 'stone', 'sand']
function setup() {
    cnv = createCanvas(600, 400);
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
            color: [100,150,255],
            f: toolFunctions[i]
        })
    }
}

function draw() {
    drawBackground(x, y);
    drawToolBar();
}

function mouseClicked() {
    toolBarFunction();
}