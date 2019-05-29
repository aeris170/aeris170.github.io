class Snake {

  constructor(x, y, z, partDimension) {
    this.position = createVector(x, y, z);
    this.partDimension = partDimension;
    this.bodyParts = [];
    this.length = 4;
    this.velocity = createVector(-partDimension, 0);
    for (let i = 0; i < this.length; i++) {
      this.bodyParts.push(createVector(this.position.x + i * partDimension, this.position.y, this.position.z));
    }
  }

  eat() {
    this.bodyParts.push(createVector(0, 0, 0));
    this.length++;
  }

  die() {
    this.bodyParts = [];
    this.length = 4;
    for (let i = 0; i < this.length; i++) {
      this.bodyParts.push(createVector(this.position.x + i * this.partDimension, this.position.y, this.position.z));
    }
  }

  tick() {
    for (let i = this.bodyParts.length - 1; i >= 1; i--) {
      this.bodyParts[i] = this.bodyParts[i - 1].copy();
    }
    this.bodyParts[0] = this.position.copy();
    this.position.add(createVector(this.velocity.x, 0, this.velocity.y));
    for (let i = 0; i < this.bodyParts.length; i++) {
      if (Math.abs(this.position.x - this.bodyParts[i].x) < 4 && Math.abs(this.position.z - this.bodyParts[i].z) < 4) {
        this.die();
      }
    }
  }

  render() {
    for (let i = 0; i < this.bodyParts.length; i++) {
      push();
      if (i === 0) {
        specularMaterial(128, 88, 20, 255);
      } else {
        specularMaterial(198, 138, 30, 255);
      }
      translate(this.bodyParts[i].x, this.bodyParts[i].y, this.bodyParts[i].z)
      box(this.partDimension);
      pop();
    }
  }
}