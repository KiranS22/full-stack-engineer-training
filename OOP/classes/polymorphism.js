/*
Polymophism means an object can have different forms or shapes
It allows for children to have different properties and methords to their parent
*/

class Vehicle {
  constructor(make, model, engineSize, color, sound) {
    this.color = color;
    this.make = make;
    this.model = model;
    this.engineSize = engineSize;
    this.engineSound = sound;
  }
  makeEngineSound() {
    console.log(`This engine makes this sound ${this.engineSound}`);
  }
}

class Van extends Vehicle {
  //This constructor is for if you want to have different values
  constructor(make, model, engineSize, color, sound) {
    // This calls the parent constructor (Vehicle constructor)

    super(make, model, engineSize, color, sound);

  }
}
const buildersVan = new Van("Ford", "F-150", "4litre", "green", "BOOM!");
console.log("builders van", buildersVan);
buildersVan.makeEngineSound();

class Truck extends Vehicle {
  constructor(make, model, engineSize, color, sound) {
    super(make, model, engineSize, color, sound);
  }
  makeEngineSound() {
    // Call to same function but it's in the parent
    super.makeEngineSound()
    // console.log(`This ${this.model} make this sound ${this.engineSound}`);
    
  }
}
const fordTruck = new Truck("Off-roader", "t5-200", "2litre", "pink", "ZOOM!");
console.log("truck", fordTruck);
fordTruck.makeEngineSound();
