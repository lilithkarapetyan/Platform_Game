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

function drawToolBar() {
    for (var i = 0; i < tools.length; i++) {
        fill(...tools[i].color);
        if (mouseX > tools[i].x && mouseX < tools[i].x + tools[i].size && mouseY > 0 && mouseY < height / 8) {
            fill(240, 240, 255)
        }
        rect(tools[i].x, 0, width / tools.length, height / 8, 5);
    }
}

function drawSea() {
    rect(0, height / 8 * 7, width, height / 8);
    fill(...bgColor);
    for (var item of seaArr) {
        ellipse(item.x, item.y, item.size)
    }
}

function checkMouseMovement() {
    if (mouseY > height / 8 && mouseY < 0 + height && mouseX > 0 && mouseX < 0 + width) {
        if (mouseX > width / 2) {
            seaArr.map(function (item) {
                return item.x > 0 - item.size / 2 ? item.x-- : item.x = width + item.size / 2;
            });


            x--;
        }
        else if (mouseX < width / 2) {
            seaArr.map(function (item) {
                return item.x < width + item.size / 2 ? item.x++ : item.x = -item.size / 2;
            });


            x++;
        }
    }
}





function toolBarFunction() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height / 8) {
        var tool = Math.floor(mouseX/tools[0].size);
        
        tools[tool].color = [255,255,200]
    }
}