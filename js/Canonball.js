/* Yanano Muruvi
 * Sunday June 7, 2015
 * Simple 2D jumping game where the player must bounce from side to side avoiding balls that are coming at them.
 */
/*
 * @type @exp;window@pro;msRequestAnimationFrame|@exp;window@pro;webkitRequestAnimationFrame|@exp;window@pro;mozRequestAnimationFrame|@exp;window@pro;requestAnimationFrame
 */
var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
/*
 * @type Array of colors 
 */
var colors = ["#F0F8FF", "#FAEBD7", "#7FFFD4", "#8A2BE2", "#A52A2A", "#7FFF00",
    "#5F9EA0", "#D2691E", "#FF7F50", "#6495ED", "#DC143C", "#00FFFF", "#008B8B",
    "#B8860B", "#BDB76B", "#FF8C00", "#9932CC", "#8FBC8F", "#00CED1", "#FF1493",
    "#FF00FF", "#FFD700", "#ADFF2F", "#FF69B4", "#F0E68C", "#778899", "#CD853F",
    "#E066E0", "#754719", "#33FFFF", "#8F6BB2", "#CC7A29", "#7519FF", "#FF4D4D"];
var greyShades = ["#8A8A8A", "#636363", "#3C3C3C", "#303030", "#242424", "#181818", "#0C0C0C", "#151515", "#323232"];

var spdMult = 0.5;/*Adding this because testing in 2020 revealed that everything moved way faster so just gonna slow things down.*/

function getRnd(min, max) {
    var num = Math.random() * (max - min) + min;
    return Math.round(num);
}
/*
 * @returns {String} that allows for 16777216 possible colors
 * some make the game easier than others :D
 */
function randomColor() {
    var chars = ["", "", "", "", "", ""];
    var color = "#";
    var num;
    for (var i = 0; i < 6; i++) {
        num = getRnd(0, 15);
        switch (num) {
            case 0:
                chars[i] = "" + num;
                break;
            case 1:
                chars[i] = "" + num;
                break;
            case 2:
                chars[i] = "" + num;
                break;
            case 3:
                chars[i] = "" + num;
                break;
            case 4:
                chars[i] = "" + num;
                break;
            case 5:
                chars[i] = "" + num;
                break;
            case 6:
                chars[i] = "" + num;
                break;
            case 7:
                chars[i] = "" + num;
                break;
            case 8:
                chars[i] = "" + num;
                break;
            case 9:
                chars[i] = "" + num;
                break;
            case 10:
                chars[i] = "A";
                break;
            case 11:
                chars[i] = "B";
                break;
            case 12:
                chars[i] = "C";
                break;
            case 13:
                chars[i] = "D";
                break;
            case 14:
                chars[i] = "E";
                break;
            case 15:
                chars[i] = "F";
                break;
        }
    }
    for (var i = 0; i < 6; i++) {
        color += chars[i];
    }
    return color;
}
/*
 * 
 * @param {type} color is the string hex value of a color that will be inverted
 * @returns {String} is the inverted color 
 */
function invertColor(color) {
    var chars = ["", "", "", "", "", ""];
    var char;
    for (var j = 0; j < 6; j++) {
        char = color.substring(j + 1, j + 2);
        if (char === "0") {
            char = "F";
        } else if (char === "1") {
            char = "E";
        } else if (char === "2") {
            char = "D";
        } else if (char === "3") {
            char = "C";
        } else if (char === "4") {
            char = "B";
        } else if (char === "5") {
            char = "A";
        } else if (char === "6") {
            char = "9";
        } else if (char === "7") {
            char = "8";
        } else if (char === "8") {
            char = "7";
        } else if (char === "9") {
            char = "6";
        } else if (char === "A") {
            char = "5";
        } else if (char === "B") {
            char = "4";
        } else if (char === "C") {
            char = "3";
        } else if (char === "D") {
            char = "2";
        } else if (char === "E") {
            char = "1";
        } else if (char === "F") {
            char = "0";
        }
        chars[j] = char;
    }
    color = "#";
    for (var i = 0; i < 6; i++) {
        color += chars[i];
    }
    return color;
}
//supposed to remove the 300ms delay from click to action in HTML5
var attachFastClick = Origami.fastclick;
attachFastClick(document.body);
//some canvas stuff
var canvas = document.getElementById('myCanvas');
/*
 * 
 * @param {type} degrees
 * @returns {Number}
 * Takes the degrees and converts them to radians.
 */
function dTR(degrees) {
    return (degrees * Math.PI) / 180;
}
/*
 * 
 * @param {type} event
 * @returns {undefined}
 * on a mouse click whatever occurs when the player presses space will occur
 */
function mouseClick(event) {
    key = 32;
}
var mouse = {x: 0, y: 0};//mouse X&Y coordinates for stuff
/*
 * @param {type} event
 * @returns {undefined}
 * something about mouse X & Y
 */
function mouseMove(event) {
    mouse.x = event.clientX - canvas.getBoundingClientRect().left;
    mouse.y = event.clientY - canvas.getBoundingClientRect().top;
}
/*
 * checks if the mouse moves and takes the coordinated if it did
 */
function checkMove() {
    canvas.addEventListemer("mousemove", mouse, false);
}
/*
 * checks if the mouse was clicked
 */
function checkClick() {
    canvas.addEventListener("click", mouseClick, false);

}
/*
 * checks if the player pressed a key and gets the keycode of the key presses
 */
function keyPress() {
    document.onkeydown = function (event) {
        var keyCode = event.keyCode;
        key = keyCode;
    };
}
/*
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 * takes the min and max and returns a random number equal or grater 
 * than the min value and less than or equal to the max.
 */

var rndBorCol = getRnd(0, 7);
var borderColor = greyShades[rndBorCol];
var rndBackCol = getRnd(0, colors.length - 1);
var canvasColor = colors[rndBackCol];
var doneAnim = false;
/*
 * changes the color of the border
 */
function newBorderCol() {
    rndBorCol = getRnd(0, greyShades.length);
    borderColor = greyShades[rndBorCol];
}
/*
 * changes the background color
 */
function newBackCol() {
    rndBackCol = getRnd(0, colors.length - 1);
    canvasColor = randomColor();
}
//canvas.style.background = canvasColor;
var screen = {width: canvas.width, height: canvas.height};
//fun screen to be drawn on
var ctx = document.getElementById('myCanvas').getContext('2d');//The canvas that everthing is being drawn on
//switches between home screen and in game
var gameScreen = 1;
//stuff for the animation at the start
var phase1 = true, phase2 = false, phase3 = false, doneSquareAnim = false;
//home animation square
var homeSquare = {x: 0, y: 0, w: 0, h: 0, color: 0};
//centre circle
var centreCircle = {x: canvas.width / 2, y: canvas.height / 2, r: 124};
//everything to do with the score
var score = {s: 0, rS: 0, hS: 0, x: 0};
//not sure why but the high score didnt work before I did this
score.hs = 1;
score.hs = 0;
//makes it screen go to the home screen
var phase = 1;
// honestly not sure why I added this, I'm just afraid to remove it now
var showCC = false;
// allows the home screen text to be shown
var showHomeText = false;

/*
 * 
 * @param {type} num
 * @returns {square.out}
 * made this because Math.pow(); made my acc function really long and 
 * hard to follow and I didn't want to break it into parts
 */
function square(num) {
    var out = num * num;
    return out;
}
/*
 function distanceFromPlayer(x,y){
 var dist = Math.sqrt(player.x*x+player.y*y);
 return dist;
 }
 */
var player = {x: 256, y: 256, yInt: 256, direction: "r", fallTime: 0, horizontalSpeed: 6, radius: 20, score: 0, highScore: 0, color: borderColor};
var botCirc = {x: canvas.width / 2, y: canvas.height * 2 + 448, r: 2 * canvas.width};
var topCirc = {x: canvas.width / 2, y: -1 * (canvas.height * 2 - 64), r: 2 * canvas.width};
var key = 0;
var fallTime = 0;
var showVCircles = false;
/*
 * draws the portion of a circle at the bottom of the screen
 */
function drawBotCircle() {
    if (showVCircles) {
        ctx.fillStyle = borderColor;
        ctx.beginPath();
        ctx.arc(botCirc.x, botCirc.y, botCirc.r, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}
/*
 * draws the portion of a circle at the top of the screen
 */
function drawTopCircle() {
    if (showVCircles) {
        ctx.fillStyle = borderColor;
        ctx.beginPath();
        ctx.arc(topCirc.x, topCirc.y, topCirc.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
/*
 * draws the circle in the centre of the screen
 */
function drawCenCirc() {
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = borderColor;
    ctx.beginPath();
    ctx.arc(centreCircle.x, centreCircle.y, centreCircle.r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalAlpha = 1;
}
// circles moving from right to left
var rightCirc = [{x: canvas.width + 44, y: 64 + 44, w: 80, h: 80, show: true, r: 44},
    {x: canvas.width + 44, y: 216 + 44, w: 80, h: 80, show: false, r: 44},
    {x: canvas.width + 44, y: 368 + 44, w: 80, h: 80, show: true, r: 44}];
// circles moving from left to right
var leftCirc = [{x: 0 - 80 - 44, y: 64 + 44, w: 80, h: 80, show: true, r: 44},
    {x: 0 - 80 - 44, y: 216 + 44, w: 80, h: 80, show: false, r: 44},
    {x: 0 - 80 - 44, y: 368 + 44, w: 80, h: 80, show: true, r: 44}];
/*
 * checks to see if there was a collision between the player and canons
 */
function checkCircColl() {
    var sumOfR = 0;
    var dist = 0;
    for (var i = 0; i < rightCirc.length; i++) {
        sumOfR = (rightCirc[i].r) + (player.radius) - 8;
        dist = Math.sqrt(square(rightCirc[i].x - player.x) + square(rightCirc[i].y - player.y));
        if (dist < sumOfR) {
            newGame();
        }
    }
    for (var i = 0; i < leftCirc.length; i++) {
        sumOfR = (leftCirc[i].r) + (player.radius) - 8;
        dist = Math.sqrt(square(leftCirc[i].x - player.x) + square(leftCirc[i].y - player.y));
        if (dist < sumOfR) {
            newGame();
        }
    }
}
/*
 * draws the canons
 */
function drawCirc() {

    for (var i = 0; i < rightCirc.length; i++) {
        ctx.fillStyle = borderColor;
        if (rightCirc[i].show) {
            ctx.beginPath();
            ctx.arc(rightCirc[i].x, rightCirc[i].y, rightCirc[i].r, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    for (var i = 0; i < leftCirc.length; i++) {
        ctx.fillStyle = borderColor;
        if (leftCirc[i].show) {
            ctx.beginPath();
            ctx.arc(leftCirc[i].x, leftCirc[i].y, leftCirc[i].r, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}
/*
 * moves the canons
 */
function moveCirc() {
    for (var i = 0; i < rightCirc.length; i++) {
        if (rightCirc[i].show && player.direction === "r")
            rightCirc[i].x -= player.horizontalSpeed * 1.35 * spdMult;
    }
    for (var i = 0; i < leftCirc.length; i++) {
        if (leftCirc[i].show && player.direction === "l")
            leftCirc[i].x += player.horizontalSpeed * 1.35 * spdMult;
    }
}
/*
 * makes new circles generate
 */
function newCirc() {
    var circs = 0;
    var row = 0;
    if (score.s !== 0) {
        for (var i = 0; i < rightCirc.length; i++) {
            rightCirc[i].x = canvas.width + rightCirc[i].r;
        }
        for (var i = 0; i < leftCirc.length; i++) {
            leftCirc[i].x = 0 - 64 - leftCirc[i].r;
        }
        for (var i = 0; i < rightCirc.length; i++) {
            rightCirc[i].show = false;
        }
        for (var i = 0; i < leftCirc.length; i++) {
            leftCirc[i].show = false;
        }
        if (player.direction === "r") {
            while (circs === 0) {
                for (var i = 0; i < rightCirc.length - 1; i++) {
                    row = getRnd(0, 2);
                    if (getRnd(1, 2) === 2) {
                        rightCirc[row].show = true;
                        circs++;
                    } else {
                        rightCirc[row].show = false;

                    }
                }
            }
        } else if (player.direction === "l") {
            while (circs === 0) {
                for (var i = 0; i < leftCirc.length - 1; i++) {
                    row = getRnd(0, 2);
                    if (getRnd(1, 2) === 2) {
                        leftCirc[row].show = true;
                        circs++;
                    } else {
                        leftCirc[row].show = false;
                    }
                }
            }
        }
    }
}
/*
 * resets the location
 */
function resetCircles() {
    rightCirc = [{x: canvas.width + 44, y: 64 + 44, w: 80, h: 80, show: true, r: 44},
        {x: canvas.width + 44, y: 216 + 44, w: 80, h: 80, show: false, r: 44},
        {x: canvas.width + 44, y: 368 + 44, w: 80, h: 80, show: true, r: 44}];
    leftCirc = [{x: 0 - 80 - 44, y: 64 + 44, w: 80, h: 80, show: true, r: 44},
        {x: 0 - 80 - 44, y: 216 + 44, w: 80, h: 80, show: false, r: 44},
        {x: 0 - 80 - 44, y: 368 + 44, w: 80, h: 80, show: true, r: 44}];
    newCirc();
}
/*
 * draws the text on the homescreen
 */
function homeText() {
    //if (showCC)drawCenCirc();
    ctx.fillStyle = canvasColor;
    ctx.font = "normal small-caps bold 28px Arial";
    ctx.fillText("High Score: " + score.hS, 155, 224);
    ctx.fillText("Recent Score: " + score.rS, 140, 262);
    ctx.font = "normal small-caps bold 20px Arial";
    ctx.fillText("Press Space or Click", 155, 300);
    ctx.fillText("To Play", 220, 328);

}
/*
 * draws the score on the circle in the middle
 */
function drawScore() {
    if (showCC)
        drawCenCirc();
    ctx.font = "130px Arial";
    ctx.fillStyle = canvasColor;
    if (score.s < 10) {
        score.x = (canvas.width / 2) - 40;
    } else if (score.s < 100) {
        score.x = (canvas.width / 2) - 76;
    } else if (score.s < 1000) {
        score.x = (canvas.width / 2) - 112;
    }
    if (score.s > 0)
        ctx.fillText(score.s, score.x, 300);
}
/*
 * resets scores when there is a new game
 */
function doScores() {
    score.rS = score.s;
    score.s = 0;
    score.hS = Math.max(score.rS, score.hS);
}
/*
 * makes a new game occur
 */
function newGame() {

    newCirc();
    resetCircles();
    doScores();
    gameScreen = 1;
    player.x = 256;
    player.y = getRnd(128, 384);
    player.yInt = player.y;
    player.fallTime = 0;
}
/*
 * refreshes the canvas
 */
function clearScreen() {
    ctx.clearRect(0, 0, screen.width, screen.height);
    ctx.fillStyle = borderColor;
    ctx.fillRect(0, 0, screen.width, screen.height);
    ctx.fillStyle = canvasColor;
    ctx.fillRect(16, 16, canvas.width - 32, canvas.height - 32);
    drawScore();
}
/*
 * a nice little animation for the home screen
 */
function animatePlayBtn() {

    //phase=getPhase(homeSquareX,homeSquareY,homeSquareW,homeSquareH,phase);
    if ((phase === 1) && (homeSquare.x >= (canvas.width * (1 / 4)))) {
        phase = 2;
    }
    if ((phase === 2) && (homeSquare.h <= (canvas.height * (1 / 8)))) {
        phase = 3;
    }
    if ((phase === 3) && (homeSquare.w >= (canvas.width))) {
        phase = 4;
    }
    ctx.fillStyle = borderColor;
    switch (phase) {
        case 1://Phase 1 is moving the square to the centre of the screen
            homeSquare.x += 2;
            homeSquare.y = homeSquare.x;
            homeSquare.w = homeSquare.x;
            homeSquare.h = homeSquare.x;
            break;
        case 2://Phase 2 shrinks the square by moving the Y coordinate down and decreasing the height
            homeSquare.y += 4;
            homeSquare.h -= 2;
            break;
        case 3:
            homeSquare.x -= 8;
            homeSquare.w += 24;
            break;
        case 4:

            phase = 5;
            break;
        case 5:
            if (homeSquare.y < canvas.height) {
                homeSquare.y += 8;
            } else {

                phase = 6;
            }
            break;
        case 6:
            if (homeSquare.y > (16)) {
                homeSquare.y -= 8;
                homeSquare.h += 8;
            } else {
                phase = 7;
                showCC = true;
                showVCircles = true;
            }
            break;
        case 7:
            showHomeText = true;
            if (homeSquare.h > 0) {
                homeSquare.h -= 8;
            } else {
                doneAnim = true;
            }
            break;
        default:
            break;
    }
    ctx.fillRect(homeSquare.x, homeSquare.y, homeSquare.w, homeSquare.h);

}
/*
 * stuff for the home screen
 */
function homeScreen() {
    if (showHomeText)
        homeText();
    animatePlayBtn();
    if (key === 32 && doneAnim) {
        setTimeout(1000);
        gameScreen = 2;
    }
    key = 0;
}
/*
 * Draws the player onto the screen
 */
function drawPlayer() {
    ctx.fillStyle = invertColor(canvasColor);
    //ctx.fillRect(x,y,player.width,player.height);
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    ctx.fill();
}
/*
 * checks for collission with the top circle
 */
function topCircleCollission() {
    var sumOfR = topCirc.r + player.radius;
    var dist = Math.sqrt(square(topCirc.x - player.x) + square(topCirc.y - player.y));
    if (dist < sumOfR) {
        newGame();
    }
}
/*
 * checks for colission with the bottom circle
 */
function botCircleCollission() {
    var sumOfR = botCirc.r + player.radius;
    var dist = Math.sqrt(square(botCirc.x - player.x) + square(botCirc.y - player.y));
    if (dist < sumOfR) {
        newGame();
    }
}
/*
 * makes the player move horizontally
 */
function moveLR() {
    if (player.direction === "r") {//right
        player.x += player.horizontalSpeed * spdMult;
    } else if (player.direction === "l") {//left
        player.x -= player.horizontalSpeed * spdMult;
    }
    if (player.x + player.radius >= canvas.width - 16) {
        player.direction = "l";
        score.s++;
        newBackCol();
        newCirc();
    } else if (player.x - player.radius <= 16) {
        player.direction = "r";
        score.s++;
        newBackCol();
        newCirc();
    }
}
/*
 * makes the player accelerate downwards
 */
function acc() {
    player.y = (square((1 / 4) * (player.fallTime - 32))) + (player.yInt - 64);
}
/*
 * the player jumping
 */
function jump() {
    if (key === 32) {
        player.fallTime = 0;
        player.yInt = player.y;
        //newBackCol();//Makes it so colors wil lchange each time the player jumps 
    }
}
/*
 * game screen
 */
function inGame() {//What happens in game
    moveCirc();
    player.fallTime += 2;
    jump();
    drawCirc();
    drawPlayer();
    acc();
    moveLR();
    topCircleCollission();
    botCircleCollission();
    checkCircColl();
    key = 0;
}
/*
 * This is the main game loop where all events are handled
 */
function mainLoop() {
    clearScreen();
    checkClick();
    drawBotCircle();
    drawTopCircle();
    keyPress();
    switch (gameScreen) {
        case 1:
            homeScreen();
            break;
        case 2:
            inGame();
            break;
    }
    requestAnimationFrame(mainLoop);
}
mainLoop();
