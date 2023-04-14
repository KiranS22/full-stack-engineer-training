/*
2
improve prrevious  shop task
- earnings private
- products sold
*/
class Shop {
  #shopEarnings;
  #numOfProductsSold;
  constructor() {
    this.products = [];
    this.productCount = 0;
    this.#numOfProductsSold = 0;
    this.#shopEarnings = 0;
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
        this.products[i].quantity -= qty;
        this.#numOfProductsSold += this.products[i].quantity;
        console.log(`You've bought ${qty} ${productName}'s`);

        this.#shopEarnings = product.price * qty;
      }
    }
  }
  getEarings() {
    return this.#shopEarnings;
  }
  getNumberOfProductsSold() {
    return this.#numOfProductsSold;
  }
}
let myShop = new Shop();

myShop.addProduct("apples", 20, 10);

myShop.addProduct("banannas", 50, 10);
myShop.addProduct("pears", 50, 5);
myShop.addProduct("plums", 20, 12);
myShop.addProduct("oranges", 20, 20);
console.log(myShop.getProducts());
myShop.buyProduct("pears", 2);
console.log("earnings after buying pears", myShop.getEarings());
