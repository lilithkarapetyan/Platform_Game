var canvasWidth = 800;
var canvasHeight = 500;

var x = 0;
var y = 0;

var gameStarted = false;
var gravity = 0.2;

var backgroundColor = [226, 249, 255];
var toolBarColor = [255, 200, 61];
var seaColor = [33, 118, 255];
var stoneColor = [205, 82, 82];
var metalColor = [170, 170, 170];
var sandColor = [255, 120, 100];
var deathBlockSlicerColor = [255, 0, 0]

var playerColor = [230, 230, 0];
var playerOpacity = 50;

var player, playerWalk;
var playerStartingX = 100;
var playerStartingY = 200;
var playerWidth = 110;
var playerHeight = 110;

var blocks = [];
var tools = [];
var seaArr = [];
var toolsFunctions = ["Play", "Stone", "Horizontal", "Vertical", "Sand", "Death", "Win"];

var waveSize = 20;
var toolBarHeight = canvasHeight / 8;
var seaStartingY = canvasHeight / 8 * 7;


var deleteButton = {
    size: 15,
    x: canvasWidth - 2 * 15, // - 2* size
    y: toolBarHeight + 15,   // + size
    color: [255, 150, 150],
    strokeWeight: 10
}

var horizontalBlocksSpeed = 0.5;
var verticalBlocksSpeed = 0.5;

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
var verticalBlocksRange = 150;

var editedBlocksID;

var playerV = 3;
var deathBlockSlicerV = 0.2;