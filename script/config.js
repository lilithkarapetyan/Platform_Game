var canvasWidth = 800;
var canvasHeight = 500;
var popup = true;
var x = 0;
var y = 0;
var levelsPassed = 3;
var gameStarted = false;
var gravity = 0.5;

var stoneImg = 'images/brickWall.png';
var sandImg = 'images/grassCenter_rounded.png';//'images/sand.png'
var metalImg = 'images/grassMid.png';//'images/metal.png'

var startImg = "images/forward.png";
var stopImg = "images/pause.png";
var stopStartW = 50;
var stopStarth = 50;

var backgroundColor = [192, 232, 236];
var toolBarColor = [246, 192, 143];
var seaColor = [56, 161, 193];
// var stoneColor = [205, 82, 82];
// var metalColor = [170, 170, 170];
// var sandColor = [255, 120, 100];
// var deathBlockSlicerColor = [255, 0, 0]

var editorColor = [170, 170, 170, 50]; //r g b alpha
var player, cup;
// var playerColor = [230, 230, 0];
var playerOpacity = 50;

var player;
var playerStartingX = 100;
var playerStartingY = 200;
var playerWidth = 30;
var playerHeight = 90;
var playerWalkSprite = { w: 72, h: 97 }
var playerWalkFrames = 11;
var playerSprite = "images/p3_spritesheet.png"
var playerWalk0 = { x: 0, y: 0 };
var playerWalk1 = { x: 73, y: 0 };
var playerWalk2 = { x: 146, y: 0 };
var playerWalk3 = { x: 0, y: 98 };
var playerWalk4 = { x: 73, y: 98 };
var playerWalk5 = { x: 146, y: 98 };
var playerWalk6 = { x: 219, y: 0 };
var playerWalk7 = { x: 292, y: 0 };
var playerWalk8 = { x: 219, y: 98 };
var playerWalk9 = { x: 365, y: 0 };
var playerWalk10 = { x: 292, y: 98 };
var playerStand = [0, 196, 66, 92];

var playerWon = false;

var cupImg = "images/lock_r.png";
var coinImg = "images/key_r.png";

var slicerImg = "images/slicer.png";
var backgroundImg = "images/bg.png"

var hArrowImg = "images/horArrow.png";
var vArrowImg = "images/vArrow.png";

// var cupColor = [255, 100, 120];
var cupWidth = 50;
var cupHeight = 50;
var cupEditing = false;

var cupStartingX = canvasWidth - playerStartingX - cupWidth
var cupStartingY = playerStartingY
var blocks = [];
var tools = [];
var seaArr = [];
var toolsFunctions = ["Play", "Stone", "Horizontal", "Vertical", "Sand", "Death", "Coin"];

var waveSize = 20;
var toolBarHeight = canvasHeight / 8;
var seaStartingY = canvasHeight / 8 * 7;


var deleteButton = {
    w: 50,
    h: 50,
    x: canvasWidth - 50 - 15, // - w - gap
    y: canvasHeight - 50 - 15,   // - h - gap
    color: [255, 145, 145],
    strokeWeight: 10,
    img: "images/trashBox.png"
}

var horizontalBlocksSpeed = 0.75;
var verticalBlocksSpeed = 0.75;

var stoneWidth = 50;
var stoneHeight = 50;
var metalBlocksWidth = 100;
var metalBlocksHeight = 25;
var sandWidth = 50;
var sandHeight = 50;
var sandBlockStartingStrength = 5;
var toolBarImagesGap = 5;

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
var playerVY = 0;
var playerA = 0.4;
var deathBlockSlicerV = 0.2;

var coins = [];
var coinColor = [255, 100, 0];
var coinSize = 30;

var data;
var built = false;
var base64;

var playerFallingMaxSpeed = 6;
var playerJumpV0 = -12;

var informed = false;

var toolBarElements = [];