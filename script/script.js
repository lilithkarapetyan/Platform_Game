var x = 0;
var y = 0;
var bgColor = [220, 220, 255];
var seaArr = []
function setup() {
    cnv = createCanvas(600, 400);
    background(...bgColor);
    noStroke();
    for (var i = 0; i <= width/20; i++) {
        seaArr.push({
            size: 20,
            x: i * 20 + 20 / 2,
            y: height / 8 * 7
        });
    }

}

function draw() {
    drawBackground(x, y);

}

function drawBackground(x, y) {
    checkMouseMovement()
    translate(x, y)
    background(...bgColor)
    fill(255, 0, 0)
    rect(width / 2, height / 2, 50, 50)
    fill(100, 100, 255);
    translate(-x, -y)
    drawSea();

}

function drawSea() {
    rect(0, height / 8 * 7, width, height / 8);
    fill(...bgColor);
    for(var item of seaArr){
        console.log(item);
        ellipse(item.x, item.y, item.size)
    }
}

function checkMouseMovement() {
    if (mouseY > 0 && mouseY < 0 + height && mouseX > 0 && mouseX < 0 + width) {
        if (mouseX > width / 2) {
            seaArr.map(function(item) {
                return item.x > 0 - item.size/2 ? item.x--: item.x = width + item.size/2;
              });
            x--;
        }
        else if (mouseX < width / 2) {
            x++
            seaArr.map(function(item) {
                return item.x < width + item.size/2? item.x++: item.x = -item.size/2 ;
              });
        }
    }
}