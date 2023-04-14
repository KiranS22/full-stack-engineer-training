// class Vehicle {
//   constructor(make, model, year) {
//     this.make = make;
//     this.year = year;
//     this.model = model;
//   }
//   drive() {
//     console.log(`I an driving ${this.model} ${this.year}`);
//   }
// }
// In inheritance you create instaces of  the child class object not the parent
// From the child object, the partent properties can  be accessed if they inherit them

// class Van extends Vehicle {
//   //This constructor is for if you want to have different values
//   constructor(make, model, year, sunroof) {
//     // This calls the parent constructor (Vehicle constructor)

//     super(make, model, year);
//     this.sunroof = sunroof;
//   }
// }
// const buildersVan = new Van("Ford", "F-150", 2005, true);
// console.log("builders van", buildersVan);

// class Truck extends Vehicle {
//   constructor(make, model, year, load, tires) {
//     super(make, model, year);
//     this.maxLoad = load;
//     this.extraTires = tires;
//   }
// }
// const fordTruck = new Truck("Off-roader", "t5-200", 2022, "1000kg", 2);
// console.log("truck", fordTruck);
// fordTruck.drive();

class Animal {
  constructor(color, numberOfLegs, type, sound) {
    this.color = color;
    this.numberOfLegs = numberOfLegs;
    this.type = type;
    this.sound = sound;
  }
  makesound() {
    console.log(`I make this sound ${this.sound}`);
  }
}

class Dog extends Animal {
  constructor(color, numberOfLegs, type, sound) {
    super(color, numberOfLegs, type, sound);
  }
}
let myDog = new Dog("brown", 4, "poodle", "WOOF WOOF");
console.log("my dog", myDog);
myDog.makesound();

class Squirel extends Animal {
  constructor(color, numberOfLegs, type, sound, climbsTree) {
    super(color, numberOfLegs, type, sound);
    this.climbsTree = climbsTree;
  }
}

const sid = new Squirel("red", 4, "red squirel", "NOM NOM", true);
console.log("sid", sid);
sid.makesound();

class Cat extends Animal {
  constructor(color, numberOfLegs, type, sound, indoors) {
    super(color, numberOfLegs, type, sound);
    this.indoors = indoors;
  }
}

const myCat = new Cat("white", 4, "Tabby", "MEOW MEOW", true);
console.log("My cat", myCat);
myCat.makesound();

console.log(myCat.indoors);
