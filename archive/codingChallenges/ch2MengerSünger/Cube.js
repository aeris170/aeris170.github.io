class Cube {

  constructor(x, y, z, dimension) {
    this.position = createVector(x, y, z);
    this.dimension = dimension;
  }

  render() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    box(this.dimension);
    pop();
  }
}