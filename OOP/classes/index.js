// Class can be used to make objects with the same structure in bulk
// Reduces repetition
// Class is a blueprint for an object
// object is an instance of a class

class Car {
  // This runs imediately when a new instance is created
  // used to give inital values to properties
  // PROPERTIES
  // things the car has
  // Methods
  // methords are related to functionality
  // this keyword acts like an object of this class inside the class in which ot is
  constructor(color, model) {
    // All properties in the constructor will be inheritted by ALL instances
    this.color = color;
    this.model = model;
    this.tires = 4;
  }
  carInfo() {
    console.log(
      `My car has is ${this.color} it was made in ${this.model} and has ${this.tires} many tires`
    );
  }
  setColor(color) {
    this.color = color;
  }
  setModel(model) {
    this.model = model;
  }
  getColor() {
    return this.color;
  }
  getTires() {
    return this.tires;
  }

  getModel() {
    return this.model;
  }
}

const car1 = new Car("blue", 2000);
const car2 = new Car("black", 2015);
const car3 = new Car("green", 2005);
console.log("first car ", car1);
console.log("second car ", car2);
console.log("third car ", car3);
console.log("car1Color", car1.color);
car1.carInfo();
car3.carInfo();
console.log("-------------------------");
console.log("before setter ", car1);
car1.setColor("pink");
console.log("After setter", car1);
console.log("-------------------------");
console.log("before setter ", car1);
car1.setModel(2002);
console.log("After setter", car1);
console.log(car1.getColor());
console.log(car1.getModel());
console.log(car1.getTires());

// Shop class

// Buy product(name, quantity)

class Shop {
  constructor() {
    this.products = [];
    this.productCount = 0;
  }
  addProduct(productName, price, qty) {
    this.products.push({ name: productName, price: price, quantity: qty });
    this.productCount++;
  }
  removeProduct(productName) {
    let filteredProducts = this.products.filter(
      (product) => product.name != productName
    );
    this.products = filteredProducts;
    this.productCount--;
  }
  getProducts() {
    return this.products;
  }

  setPrice(productName, price) {
    let productToUpdate = this.products.find(
      (product) => product.name === productName
    );

    productToUpdate.price = price;
  }
  getNumberOfProducts() {
    return this.productCount;
  }
  setQuantity(productName, qty) {
    let productToUpdate = this.products.find(
      (product) => product.name === productName
    );
    productToUpdate.quantity = qty;
  }
  buyProduct(productName, qty) {
    for (let i = 0; i < this.products.length; i++) {
      let product = this.products[i];
      if (product.name == productName) {
        console.log("product", product);
        this.products[i].quantity -= qty;
        console.log(`You've bought ${qty} ${productName}'s`);
      }
    }
  }
}
let myShop = new Shop();
console.log(myShop.getProducts());

myShop.addProduct("apples", 0.2, 10);

myShop.setPrice("apples", 0.5);

myShop.getProducts();

myShop.addProduct("banannas", 0.5, 10);
myShop.addProduct("pears", 0.2, 5);
myShop.addProduct("plums", 0.2, 12);
myShop.addProduct("oranges", 0.2, 20);
console.log("Products afer adding some more", myShop.getProducts());
console.log(myShop.getNumberOfProducts());
myShop.removeProduct("pears");
console.log("products before quantity setter", myShop.getProducts());
myShop.setQuantity("oranges", 100);
console.log("products after quantity setter", myShop.getProducts());
myShop.buyProduct("banannas", 4);
console.log("products after buying bananas", myShop.getProducts());
console.log("..............................................");
console.log("buying bananas again!");
myShop.buyProduct("banannas", 4);
console.log("products after buying bananas", myShop.getProducts());
