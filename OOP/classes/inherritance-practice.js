/*
1
create shape class with properties sides color
create children
- circle
-square
=rectangle
-hexagon
*/
class Shape {
  constructor(name, sides, color) {
    this.numOfSides = sides;
    this.color = color;
    this.name = name;
  }
  sayHello() {
    console.log(` Hello! I am a ${this.name} I have ${this.sides} sides`);
  }
}
class Circle extends Shape {
  constructor(sides, color, name) {
    super(sides, color, name);
  }
}
const myCircle = new Circle("circle", 1, "Green");
console.log("circle:", myCircle);
myCircle.sayHello();

class Square extends Shape {
  constructor(name, sides, color) {
    super(name, sides, color);
  }
}
const mySquare = new Square("square", 4, "red");
console.log("square", mySquare);
mySquare.sayHello();

class Rectangle extends Shape {
  constructor(name, sides, color) {
    super(name, sides, color);
  }
}
const myRectangle = new Rectangle("rectangle", 4, "blue");
console.log("rectangle", myRectangle);
myRectangle.sayHello();

class Hexagon extends Shape {
  constructor(name, sides, color) {
    super(name, sides, color);
  }
}

const myHex = new Hexagon("Hexagon", 6, "pink");
console.log("Hex", myHex);
myHex.sayHello();
