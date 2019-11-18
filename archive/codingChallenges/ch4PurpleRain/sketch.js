var canvas;
//138 43 226
//230 230 250

var rains = [];
var maxRains = 2000;
var gravity = 0.02;

function setup() {
  canvas = createCanvas(0, 0);
  window.onresize();
  for (let i = 0; i < maxRains; i++) {
    rains.push(new Rain());
  }
  noStroke();
}

function draw() {
  background(230, 230, 250);
  fill(138, 43, 226);
  rains.forEach(function (rain) {
    rain.tick();
  });
  rains.forEach(function (rain) {
    rain.render();
  });
}

window.onresize = function () {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w, h);
  width = w;
  height = h;
  rains.forEach(function (rain) {
    rain.onresize();
  });
};