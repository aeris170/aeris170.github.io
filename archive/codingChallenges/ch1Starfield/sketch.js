var canvas;

const starCount = 400;
var stars = [];
var speed = 0;

function setup() {
  canvas = createCanvas(0, 0);
  window.onresize();
  for (let i = 0; i < starCount; i++) {
    stars.push(new Star(width, height));
  }
  ellipseMode(CENTER);
  fill(255);
  stroke(255);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  for (let i = 0; i < starCount; i++) {
    stars[i].tick();
    stars[i].render();
  }
}

window.onresize = function () {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w, h);
  width = w;
  height = h;
  speed = width / 48;
};