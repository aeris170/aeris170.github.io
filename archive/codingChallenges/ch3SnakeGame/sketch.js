p5.disableFriendlyErrors = true; // disables FES

const rotSpeed = 15;

var playArea;
var snake;
var rotY = 0;
var destRotY = 0;
var rotDelta = 0;
var isRotating = false;
var foods = [];
var gameStarted = false;

function preload() {
  font = loadFont(
    "../../../lib/eczar/Eczar-Bold.ttf"
  );
}

function setup() {
  snake = new Snake(8, 8, 8, 8);
  frameRate(20);
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  angleMode(DEGREES);
  textFont(font, 20);
  textAlign(CENTER, CENTER);
  window.onresize();
  foods.push(new Cube(Math.round(map(Math.random(), 0, 1, snake.position.x - 8, snake.position.x + 8)) * 8, 8, Math.round(map(Math.random(), 0, 1, snake.position.z - 10, snake.position.z + 10)) * 8, 8, 8, 8));
}

function draw() {
  background(0, 25, 0, 255);
  smooth();
  ambientLight(255, 255, 255);
  camera(snake.position.x + 80 + snake.length * 3, snake.position.y + 60 + snake.length * 3, snake.position.z, snake.position.x, snake.position.y, snake.position.z, 0, -1, 0);
  specularMaterial(198, 138, 30, 255);
  translate(snake.position.x, 0, snake.position.z);
  if (isRotating) {
    rotY += rotDelta
  }
  if (rotY === destRotY) {
    isRotating = false;
  }
  rotateY(rotY);
  translate(-snake.position.x, 0, -snake.position.z);
  if (gameStarted) {
    snake.tick();
  }
  snake.render();
  noStroke();
  stroke(15, 15, 15);
  specularMaterial(255, 0, 0, 255);
  for (let i = foods.length - 1; i >= 0; i--) {
    let food = foods[i];
    food.render();
    if (Math.abs(snake.position.x - food.position.x) < 4 && Math.abs(snake.position.z - food.position.z) < 4) {
      snake.eat();
      foods.splice(i, 1);
    }
  }
  if (foods.length < Math.pow(snake.length + 6, 2) && foods.length < 200) {
    for (let i = foods.length; i < Math.pow(snake.length + 6, 2) && i < 200; i++) {
      foods.push(new Cube(Math.round(map(Math.random(), 0, 1, snake.position.x - 8 * snake.length / 2, snake.position.x + 8 * snake.length / 2)) * 8, 8, Math.round(map(Math.random(), 0, 1, snake.position.z - 8 * snake.length / 2, snake.position.z + 8 * snake.length / 2)) * 8, 8, 8, 8));
    }
  }
  push();
  translate(100, -80);
  rotateZ(180);
  rotateY(270);
  translate(-100, 80);
  translate(120, -200, -200);
  normalMaterial();
  text('A/D', -140, 0, 0);
  text('or', -100, 0, 0);
  text('arrow', -50, 0, 0);
  text('keys', 10, 0, 0);
  text('to', 55, 0, 0);
  text('move', 110, 0, 0);
  pop();
}

function keyPressed() {
  if (isRotating) {
    return;
  }
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    rotDelta = rotSpeed;
    destRotY = rotY + 90;
    snake.velocity.rotate(90);
    isRotating = true;
    gameStarted = true;
  }
  if (keyCode === RIGHT_ARROW || keyCode === 68) {
    rotDelta = -rotSpeed;
    destRotY = rotY - 90;
    snake.velocity.rotate(-90);
    isRotating = true;
    gameStarted = true;
  }
}

window.onresize = function () {
  resizeCanvas(window.innerWidth, window.innerHeight);
  perspective(110, width / height, 0.001, 10000);
};