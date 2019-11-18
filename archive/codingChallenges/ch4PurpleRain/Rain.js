class Rain {

  constructor() {
    this.coldStart();
  }

  tick() {
    this.y += this.speed;
    this.speed += gravity;
    if (this.y > height) {
      this.rejuvenate();
    }
  }

  render() {
    rect(this.x, this.y, this.width, this.height);
  }

  coldStart() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.width = Math.random() * 3;
    if (this.width <= 1 && Math.random() > 0.5) {
      this.width += 1; //to reduce the amount of rains that will appear in the background.
    }
    this.height = Math.random() * 3 + this.width * 6;
    this.speed = (this.width * this.height) / 8;
  }

  rejuvenate() {
    this.x = Math.random() * width;
    this.y = Math.random() * -50;
    this.width = Math.random() * 3;
    if (this.width <= 1 && Math.random() > 0.5) {
      this.width += 1; //to reduce the amount of rains that will appear in the background.
    }
    this.height = Math.random() * 3 + this.width * 6;
    this.speed = (this.width * this.height) / 8;
  }

  onresize() {
    this.x = Math.random() * width;
  }
}