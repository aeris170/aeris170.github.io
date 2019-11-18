var canvas;

var alienArrays = []; // all the arrays below
var aliensTop = [];
var aliensMiddle = [];
var aliensDown = [];
var max_aliens_per_row = 13;

function preload() {
  Alien.loadAlienImage();
}

function setup() {
  canvas = createCanvas(0, 0);
  window.onresize();
  let x = (width - alienWidth) / 2;
  let y = alienHeight * 1.4;
  alienArrays.push(aliensTop);
  alienArrays.push(aliensMiddle);
  alienArrays.push(aliensDown);
  for (let i = 0; i < max_aliens_per_row; i++) {
    aliensTop.push(new Alien(x + ((i - 7) * alienWidth), y));
    aliensMiddle.push(new Alien(x + ((i - 5) * alienWidth), 2 * y));
    aliensDown.push(new Alien(x + ((i - 7) * alienWidth), 3 * y));
  }
}

function draw() {
  background(0);
  alienArrays.forEach(function (arr) {
    arr.forEach(function (alien) {
      alien.tick();
    });
  });
  alienArrays.forEach(function (arr) {
    arr.forEach(function (alien) {
      if (alien.checkAccumulator()) {
        return;
      }
    });
  });
  if (accumulator >= 5) {
    accumulator = 0;
    alienArrays.forEach(function (arr) {
      arr.forEach(function (alien) {
        alien.y += alienHeight;
      });
    });
  }
  alienArrays.forEach(function (arr) {
    arr.forEach(function (alien) {
      alien.render();
    });
  });
}

window.onresize = function () {
  var w = window.innerWidth;
  var h = window.innerHeight;
  canvas.size(w, h);
  width = w;
  height = h;
  alienWidth /= 1920 / w;
  alienHeight /= 969 / h;
};