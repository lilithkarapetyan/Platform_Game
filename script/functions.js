function drawBackground(x, y) {
    if (!mouseIsPressed)
        checkMouseMovement();
    translate(x, y)
    background(...bgColor)
    translate(-x, -y)
    fill(100, 100, 255);
    drawSea();
    translate(x, y)
    drawBlocks();
    translate(-x, -y)
}

function drawToolBar() {
    for (var i = 0; i < tools.length; i++) {
        fill(...tools[i].color);
        if (mouseX > tools[i].x && mouseX < tools[i].x + tools[i].size && mouseY > 0 && mouseY < height / 8) {
            fill(240, 240, 255)
        }
        rect(tools[i].x, 0, width / tools.length, height / 8, 5);
    }
    strokeWeight(10);
    stroke(255,150,150)
    line(del.x, del.y, del.x + del.size, del.y + del.size)
    line(del.x + del.size, del.y, del.x , del.y + del.size);
    stroke(0)
    strokeWeight(1)
    noStroke()
}

function drawSea() {
    rect(0, height / 8 * 7, width, height / 8);
    fill(...bgColor);
    for (var item of seaArr) {
        ellipse(item.x, item.y, item.size)
    }
}

function checkMouseMovement() {
    if (mouseY > height / 8  + del.y + del.size && mouseY < 0 + height && mouseX > 0 && mouseX < 0 + width) {
        
        if (mouseX > width / 5 * 4 && x > -400) {
            seaArr.map(function (item) {
                return item.x > 0 - item.size / 2 ? item.x-- : item.x = width + item.size / 2;
            });
            x--;
        }
        else if (mouseX < width / 5 && x < 0) {
            seaArr.map(function (item) {
                return item.x < width + item.size / 2 ? item.x++ : item.x = -item.size / 2;
            });
            x++;
        }
    }
}





function toolBarFunction() {

    var tool = Math.floor(mouseX / tools[0].size);
    // tools[tool].color = [255, 255, 200];

    if (tools[tool].f == 'play') {
        character();
    }
    else if (tools[tool].f == 'stone') {
        blocks.push(new Block(tools[tool].x, tools[tool].y, 50, 50, 'stone'));
        addedBlock = true;
    }
    else if(tools[tool].f == 'iron'){
        blocks.push(new Block(tools[tool].x, tools[tool].y, 100, 25, 'iron'));
        addedBlock = true;
    }
}


function character() {

}

function drawBlocks() {
    stroke(2)
    for (var block of blocks) {
        if (block.type == 'stone') {
            fill(145, 84, 0)
        }
        else if(block.type == 'iron'){
            fill(200)
        }
        rect(block.x, block.y, block.w, block.h)
    }
    noStroke()
}

function editBlocks() {
    var blockIndex = blocks.findIndex(function (b) {
        return mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h;
    });
    return blockIndex
 
}