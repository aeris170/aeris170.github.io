p5.disableFriendlyErrors = true; // disables FES

var cubes = [];
var mengerSize = 0;

var isDeviceShakenRecently = false; //for mobile compatibility
var deviceRotX = 0;
var deviceRotY = 0;
var deviceRotZ = 0;

var font;

function preload() {
  font = loadFont(
    "../../../lib/eczar/Eczar-Bold.ttf"
  );
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  cubes.push(new Cube(0, 0, 0, mengerSize = Math.min(width, height) / 4));
  setShakeThreshold(50);
  textFont(font, Math.min(40, width / 32));
  textAlign(CENTER, CENTER);
  document.addEventListener('touchstart', function (e) {
    e.preventDefault()
  }, false);
  document.addEventListener('touchmove', function (e) {
    e.preventDefault()
  }, false);
  window.onresize();
}

function draw() {
  background(30);
  orbitControl(2, 2);
  strokeWeight(2);
  stroke(10, 10, 40);
  smooth();
  rotateX(deviceRotX);
  rotateY(deviceRotY);
  rotateZ(deviceRotZ);
  ambientLight(255, 255, 0);
  specularMaterial(255, 255, 255, 255);
  cubes.forEach(function (cube) {
    cube.render();
  });
  normalMaterial();
  text('Camera: Use Mouse or Orient Phone', 0, -300);
  text('Mengerize: SPACE or Shake Phone', 0, -200);
}

function deviceTurned() {
  if (turnAxis === 'X') {
    deviceRotX += 45;
  } else if (turnAxis === 'Y') {
    deviceRotY += 45;
  } else if (turnAxis === 'Z') {
    deviceRotZ += 45;
  }
}

function deviceShaken() {
  if (!isDeviceShakenRecently) {
    isDeviceShakenRecently = true;
    mengerize();
    setTimeout(function () {
      isDeviceShakenRecently = false;
    }, 2000);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    mengerize();
  }
}

function mengerize() {
  mengerSize = mengerSize / 3;
  slices = [];
  for (let m = 0; m < cubes.length; m++) {
    let parent = cubes[m];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i == 1 && j == 1) continue;
        for (let k = 0; k < 3; k++) {
          if ((i == 1 || j == 1) && k == 1) continue;
          slices.push(new Cube(parent.position.x + (i - 1) * mengerSize, parent.position.y + (j - 1) * mengerSize, parent.position.z + (k - 1) * mengerSize, mengerSize));
        }
      }
    }
  }
  cubes = slices;
}

window.onresize = function () {
  resizeCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  perspective(110, width / height, 0.01, 10000);
};