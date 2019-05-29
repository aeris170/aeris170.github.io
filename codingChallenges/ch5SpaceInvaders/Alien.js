var alienImage;
var alienWidth;
var alienHeight;
var alienDirection = -1;
var accumulator = 0;

class Alien {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = alienWidth;
    this.height = alienHeight;
  }

  tick() {
    this.x += alienDirection;
  }

  render() {
    image(alienImage, this.x, this.y, this.width, this.height);
  }

  checkAccumulator() {
    if (this.x <= 0) {
      alienDirection = 1;
      accumulator++;
      return accumulator;
    } else if (this.x + this.width >= width) {
      alienDirection = -1;
      accumulator++;
      return accumulator;
    }
    return accumulator;
  }

  static loadAlienImage() {
    //load image is async, must use callback!
    alienImage = loadImage('alien.png', () => {
      alienWidth = alienImage.width / 4;
      alienHeight = alienImage.height / 4;
    });
  }
}