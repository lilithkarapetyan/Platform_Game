var canvasWidth = 800;
var canvasHeight = 500;

var x = 0;
var y = 0;

var gameStarted = false;
var gravity = 0.5;

var stoneImgURL = 'images/brickWall.png';
var stoneImg;
var sandImgURL = 'images/grassCenter_rounded.png';//'images/sand.png'
var sandImg;
var metalImgURL = 'images/grassMid.png';//'images/metal.png'
var metalImg;

var backgroundColor = [192, 232, 236];
var toolBarColor = [246, 192, 143];
var seaColor = [56, 161, 193];
var stoneColor = [205, 82, 82];
var metalColor = [170, 170, 170];
var sandColor = [255, 120, 100];
var deathBlockSlicerColor = [255, 0, 0]

var player, cup;
var playerColor = [230, 230, 0];
var playerOpacity = 50;

var player;
var playerStartingX = 100;
var playerStartingY = 200;
var playerWidth = 40;
var playerHeight = 94;
var playerWalkSprite = { w: 70, h: 94 }
var playerWalkFrames = 11;
var playerSprite = "images/p2_spritesheet.png"
var playerWalk0 = { x: 0, y: 0 };
var playerWalk1 = { x: 71, y: 0 };
var playerWalk2 = { x: 142, y: 0 };
var playerWalk3 = { x: 0, y: 95 };
var playerWalk4 = { x: 71, y: 95 };
var playerWalk5 = { x: 142, y: 95 };
var playerWalk6 = { x: 213, y: 0 };
var playerWalk7 = { x: 284, y: 0 };
var playerWalk8 = { x: 213, y: 95 };
var playerWalk9 = { x: 355, y: 0 };
var playerWalk10 = { x: 284, y: 95 };
var playerStand = [67, 190, 66, 92];

var cupImg = "images/iceCream.png";
var coinImg = "images/hud_coins.png";

var slicerImg = "images/slicer.png";
var backgroundImg = "images/bg.png"

var cupColor = [255, 100, 120];
var cupWidth = 45;
var cupHeight = 75;
var cupEditing = false;

var cupStartingX = canvasWidth - playerStartingX - cupWidth
var cupStartingY = playerStartingY
var blocks = [];
var tools = [];
var seaArr = [];
var toolsFunctions = ["Play", "Stone", "Horizontal", "Vertical", "Sand", "Death", "Coin", "Save"];

var waveSize = 20;
var toolBarHeight = canvasHeight / 8;
var seaStartingY = canvasHeight / 8 * 7;


var deleteButton = {
    size: 15,
    x: canvasWidth - 2 * 15, // - 2* size
    y: toolBarHeight + 15,   // + size
    color: [255, 145, 145],
    strokeWeight: 10
}

var horizontalBlocksSpeed = 0.75;
var verticalBlocksSpeed = 0.75;

var stoneWidth = 50;
var stoneHeight = 50;
var metalBlocksWidth = 100;
var metalBlocksHeight = 25;
var sandWidth = 50;
var sandHeight = 50;

var toolBarRectCorners = 5;
var toolBarTextSize = 20;

var backgroundSize = 1200;     // > canvasWidth
var backgroundEditRange = 5;   // 1/5 of Canvas

var blocksRoundedCorners = 2;

var horizontalBlocksRange = 150;
var verticalBlocksRange = 75;

var editedBlocksID;
var editedCoinsID;
var playerEditing = false;
var blockRangeEditing = false;

var playerVX = 3;
var playerVY = 3;
var playerA = 0.4;
var deathBlockSlicerV = 0.2;

var coins = [];
var coinColor = [255, 100, 0];
var coinSize = 20;


/*for(var i  = 0; i < playerWalkFrames; i++){
    window['playerWalk' + i][0]+=10;
}*/