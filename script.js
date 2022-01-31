
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = 'right';
// let rx;
// let ry;
const xStart = 50; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;
let xCor = [];
let yCor = [];
let score = 0;
let xFruit = 0;
let yFruit = 0;
let scoreElem;

function preload() {
 // var coin = loadSound("coin.mp3");
}
function setup() {
  // ry = random(0, windowHeight);
  // rx = random(0, windowWidth);
  
  scoreElem = createDiv('Score: 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'black');

  createCanvas(windowWidth-20, windowHeight-20);
  frameRate(15);
  stroke(0);
  strokeWeight(10);
  updateFruitCoordinates();

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(255);
  rect(0,0,width,height)
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  stroke("black");
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    scoreElem.html('Game Over! Score: ' + score);
  }
}

function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}


function checkForFruit() {
  // stroke("red");
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    score++;
    // coin.play();
    scoreElem.html('Score: ' + (score));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 37 :
    if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 65:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 39:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 68:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 38:
    if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 87:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 40:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
    case 83:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}
