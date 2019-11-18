class Star {

  constructor() {
    this.generateRandomXYW();
  }

  tick() {
    this.prevX = map((this.x / this.w), 0, 1, 0, width);
    this.prevY = map((this.y / this.w), 0, 1, 0, height);

    this.w -= speed;
    if (this.w < speed) {
      this.generateRandomXYW();
    }

    this.mappedX = map((this.x / this.w), 0, 1, 0, width);
    this.mappedY = map((this.y / this.w), 0, 1, 0, height);
  }

  render() {
    line(this.prevX, this.prevY, this.mappedX, this.mappedY);
  }

  generateRandomXYW() {
    this.x = map(Math.random(), 0, 1, -width / 2, width / 2);
    this.y = map(Math.random(), 0, 1, -height / 2, height / 2);
    this.w = map(Math.random(), 0, 1, 0, width);
    this.prevX = map((this.x / this.w), 0, 1, 0, width);
    this.prevY = map((this.y / this.w), 0, 1, 0, height);
  }
}