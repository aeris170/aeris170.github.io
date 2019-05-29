class Cube {

  constructor(x, y, z, dimensionX, dimensionY, dimensionZ) {
    this.position = createVector(x, y, z);
    this.dimension = createVector(dimensionX, dimensionY, dimensionZ);
  }

  render() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    box(this.dimension.x, this.dimension.y, this.dimension.z);
    pop();
  }
}