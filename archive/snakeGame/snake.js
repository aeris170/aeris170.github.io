var options = {
  'scoreboardWidth': '47vw',
  'scoreboardHeight': 'auto',
  'submitDialogWidth': '15vw',
  'submitDialogHeight': 'auto',
  'overflow': 'hidden',
  'burey': {
    'display': 'none',
  },
  'dialogTitle': {
    'box-shadow': '0px 0px 3px #15AB00, inset 0px 0px 5px 1px white',
    'text-shadow': '0px 0px 1px #FFFFFF',
    'border': '1px solid #15AB00',
    'border-radius': '2%',
    'font-family': 'Eczar, serif',
    'text-align': 'center',
    'background': '#282828',
    'color': '#15AB00',
  },
  'scoreboardContainer': {
    'border': '1px solid #15AB00',
    'overflow-x': 'hidden',
    'box-shadow': '0px 0px 3px #15AB00, inset 0px 0px 5px 1px white',
    'background-color': '#282828',
  },
  'tableHeader': {
    'font-family': 'Eczar, serif',
    'text-align': 'center',
    'box-shadow': '0px 0px 2px #15AB00, inset 0px 0px 3px white',
    'text-shadow': '0px 0px 1px #FFFFFF',
    'color': '#15AB00',
  },
  'scorePosition': {
    'font-family': 'Eczar, serif',
    'text-align': 'center',
    'color': '#15AB00',
  },
  'scoreName': {
    'font-family': 'Eczar, serif',
    'text-align': 'center',
    'color': '#15AB00',
    'width': '50%',
  },
  'scoreValue': {
    'font-family': 'Eczar, serif',
    'text-align': 'center',
    'font-size': '15px',
    'color': '#15AB00',
    'width': '20%',
  },
  'scoreTime': {
    'font-family': 'Eczar, serif',
    'text-align': 'center',
    'font-size': '12px',
    'color': '#15AB00',
    'width': '30%',
  },
  'newScoreContainer': {
    'background-color': '#282828',
    'border': '1px solid #15AB00',
    'box-shadow': '0px 0px 2px #15AB00, inset 0px 0px 3px white',
  },
  'scoreYourScoreLabel': {
    'font-family': 'Eczar, serif',
    'color': '#15AB00',
    'text-shadow': '0px 0px 1px #FFFFFF',
    'align': 'right',
  },
  'scoreValueLabel': {
    'font-family': 'Eczar, serif',
    'color': '#15AB00',
    'text-shadow': '0px 0px 1px #FFFFFF',
    'align': 'right',
  },
  'scoreErrorLabel': {
    'font-family': 'Eczar, serif',
    'color': 'red',
  },
  'scoreboardButtons': {
    'border': '1px solid #15AB00',
    'font-family': 'Eczar, serif',
    'font-size': '15px',
    'text-shadow': '0px 0px 1px #FFFFFF',
    'background': '#161616',
    'color': '#15AB00',
    'display': 'block',
    'margin-bottom': '5px',
    'margin-top': '5px',
    'margin-right': '5px',
    'margin-left': '5px',
    'text-align': 'center',
  },
  'newScoreButtons': {
    'border': '1px solid #15AB00',
    'font-family': 'Eczar, serif',
    'background': '#161616',
    'color': '#15AB00',
    'text-align': 'center',
  },
  'dialogButtonPanels': {
    'font-family': 'Eczar, serif',
    'text-shadow': '0px 0px 1px #FFFFFF',
    'background': '#282828',
    'box-shadow': '0px 0px 2px #15AB00, inset 0px 0px 3px white',
  },
  'sortDropDownList': {
    'font-family': 'Eczar, serif',
    'font-size': '15px',
    'margin-bottom': '5px',
    'margin-top': '5px',
    'margin-right': '5px',
    'margin-left': '5px',
    'background': '#282828',
    'color': '#15AB00',
  },
  'loaderOptions': {
    'border-bottom': '25px solid #888',
    'border-top': '25px solid #888',
    'border-right': '25px solid #15AB00',
    'border-left': '25px solid #15AB00',
    'margin-left': 'auto',
    'margin-right': 'auto',
  }
};

window.onload = function () {

  function resize() {
    var canvas = document.getElementById('snake-canvas');
    var canvasRatio = canvas.height / canvas.width;
    var windowRatio = window.innerHeight / window.innerWidth;
    var width;
    var height;
    if (windowRatio < canvasRatio) {
      height = window.innerHeight;
      width = height / canvasRatio;
    } else {
      width = window.innerWidth;
      height = width * canvasRatio;
    }
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  };
  window.addEventListener('resize', resize, false);

  var gameLoop = null;
  var scoreboard = null;
  var interval = 100;
  var gameStarted = false;
  var xVel = 0;
  var yVel = 0;
  var trail = [];
  var tail = 5;
  var lastPressed = 0;
  var bombCount = 0;
  var bombs = [];

  var canvas = document.getElementById('snake-canvas');
  resize();
  var gridSize = gcd(canvas.width, canvas.height) / 2;
  var tileCapX = canvas.width / gridSize;
  var tileCapY = canvas.height / gridSize;
  var playerX = gridSize / 5;
  var playerY = gridSize / 5;
  var foodX = gridSize / 5 * 1.5;
  var foodY = gridSize / 5 * 1.5;
  var context = canvas.getContext('2d');
  var desert = document.getElementById('desert');
  var food = document.getElementById('food');

  document.addEventListener('keydown', keyPush);

  scoreboard = new Scoreboard(options);

  context.fillStyle = 'black';
  context.font = '38px Georgia';
  context.drawImage(desert, 0, 0, canvas.width, canvas.height);
  context.drawImage(snekhead, playerX * gridSize, playerY * gridSize, gridSize - 2, gridSize - 2);
  context.drawImage(food, foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
  var s = 'The Snek...';
  context.fillText(s, canvas.width / 2 - context.measureText(s).width / 2 - canvas.width / 17, canvas.height / 17);
  s = 'Points: ';
  context.fillText(s + (tail - 5), canvas.width / 2 - context.measureText(s).width / 2 + canvas.width / 17, canvas.height / 17);
  s = 'Loud music warning!';
  context.fillStyle = 'red';
  context.fillText(s, 0, 30);
  context.fillText(s, canvas.width - context.measureText(s).width, 30);
  context.fillText(s, 0, canvas.height - 75);
  context.fillText(s, canvas.width - context.measureText(s).width, canvas.height - 75);
  context.fillStyle = 'green';
  context.fillText(s, 0, 60);
  context.fillText(s, canvas.width - context.measureText(s).width, 60);
  context.fillText(s, 0, canvas.height - 45);
  context.fillText(s, canvas.width - context.measureText(s).width, canvas.height - 45);
  context.fillStyle = 'blue';
  context.fillText(s, 0, 90);
  context.fillText(s, canvas.width - context.measureText(s).width, 90);
  context.fillText(s, 0, canvas.height - 15);
  context.fillText(s, canvas.width - context.measureText(s).width, canvas.height - 15);

  function game() {
    playerX += xVel;
    playerY += yVel;
    if (playerX < 0) {
      playerX = tileCapX - 1;
    }
    if (playerX > tileCapX - 1) {
      playerX = 0;
    }
    if (playerY < 0) {
      playerY = tileCapY - 1;
    }
    if (playerY > tileCapY - 1) {
      playerY = 0;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(desert, 0, 0, canvas.width, canvas.height);
    for (var i = 0; i < trail.length; i++) {
      if (i == trail.length - 1) {
        context.drawImage(snekhead, trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
      } else {
        context.drawImage(snekbody, trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
      }
      if (trail[i].x == playerX && trail[i].y == playerY) {
        tail = 5;
        interval = 100;
      }
    }
    trail.push({
      x: playerX,
      y: playerY
    });
    while (trail.length > tail) {
      trail.shift();
    }
    if (foodX == playerX && foodY == playerY) {
      tail++;
      bombs.push({
        x: Math.floor(Math.random() * tileCapX),
        y: Math.floor(Math.random() * tileCapY)
      });
      bombCount++;
      foodX = Math.floor(Math.random() * tileCapX);
      foodY = Math.floor(Math.random() * tileCapY);
      interval -= 5;
    }
    context.drawImage(food, foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);
    for (var i = 0; i < bombCount; i++) {
      if (bombs[i].x == playerX && bombs[i].y == playerY) {
        var endGameScreen = setTimeout(function () {
          scoreboard.showScoreBoard();
          scoreboard.submitNewScoreDialog(tail - 5);
          clearTimeout(gameLoop);
          clearTimeout(endGameScreen);
          tail = 5;
          interval = 100;
          bombs = [];
          bombCount = 0;
          foodX = Math.floor(Math.random() * tileCapX);
          foodY = Math.floor(Math.random() * tileCapY);
        }, interval * 0.5);
        break;
      }
    }
    for (var i = 0; i < bombCount; i++) {
      context.drawImage(bomb, bombs[i].x * gridSize, bombs[i].y * gridSize, gridSize, gridSize);
    }
    var s = 'The Snek...';
    context.fillText(s, canvas.width / 2 - context.measureText(s).width / 2 - canvas.width / 17, canvas.height / 17);
    s = 'Points: ';
    context.fillText(s + (tail - 5), canvas.width / 2 - context.measureText(s).width / 2 + canvas.width / 17, canvas.height / 17);
  };

  function keyPush(evt) {
    switch (evt.keyCode) {
    case 37:
      if (!gameStarted) {
        loop();
        var audio = document.getElementById("music");
        audio.volume = 0.2;
        audio.play();
        gameStarted = true;
      }
      if (lastPressed != 39) {
        lastPressed = evt.keyCode;
        xVel = -1;
        yVel = 0;
      }
      break;
    case 38:
      if (!gameStarted) {
        loop();
        var audio = document.getElementById("music");
        audio.volume = 0.2;
        audio.play();
        gameStarted = true;
      }
      if (lastPressed != 40) {
        xVel = 0;
        yVel = -1;
        lastPressed = evt.keyCode;
      }
      break;
    case 39:
      if (!gameStarted) {
        loop();
        var audio = document.getElementById("music");
        audio.volume = 0.2;
        audio.play();
        gameStarted = true;
      }
      if (lastPressed != 37) {
        xVel = 1;
        yVel = 0;
        lastPressed = evt.keyCode;
      }
      break;
    case 40:
      if (!gameStarted) {
        loop();
        var audio = document.getElementById("music");
        audio.volume = 0.2;
        audio.play();
        gameStarted = true;
      }
      if (lastPressed != 38) {
        xVel = 0;
        yVel = 1;
        lastPressed = evt.keyCode;
      }
      break;
    }
  };

  function loop() {
    game();
    gameLoop = window.setTimeout(loop, interval);
  };

  function gcd(a, b) {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
  };
};