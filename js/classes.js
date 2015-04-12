class Shape {

  constructor (numSides) {
      this.numSides = numSides;
  }

  get sides () {
     return this.numSides;
  }

  describe () {
    return Shape.label() + ' with ' + this.sides + ' sides';
  }

  static label () {
    return 'A shape';
  }
}

class Triangle extends Shape {

  constructor () {
    super(3);
  }

  describe () {
    return super.describe() + ', A.K.A. a triangle';
  }
}

var triangle = new Triangle();
console.log(triangle.describe());
