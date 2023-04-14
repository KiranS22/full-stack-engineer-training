/*
Access specifiers determine whethwer or not a property can be accsessed outside of the class or not.
*/
class BankAccount {
  #balance = "$8000";
  #pin;
  constructor(pin, type, sortCode, accNum) {
    this.#pin = pin;
    this.type = type;
    this.sortCode = sortCode;
    this.accNum = accNum;
  }
  getPin() {
    return this.#pin;
  }
  setPin(oldPin, newPin) {
    if (this.#pin === oldPin) {
      this.#pin = newPin;
      console.log("pin changed successfuly");
    } else {
      console.log("Pins don't match");
    }
  }
  getBalance() {
    return this.#balance;
  }
  setBalance(newBalance) {
    this.#balance = newBalance;
  }
}

let myBankAcc = new BankAccount(1234, "current", "22-44-22", 123456789);
console.log("Type", myBankAcc.type);
console.log("soertCode", myBankAcc.sortCode);
// cannot  be accessed outside of class - if you need accesss  use getter/setter
// console.log("pin", myBankAcc.#pin);
myBankAcc.setPin(1234, 5678);
console.log(myBankAcc.getPin());
// cannot  be accessed outside of class - if you need accesss  use getter/setter
// console.log(myBankAcc.#balance);
console.log(myBankAcc.getBalance());
myBankAcc.setBalance("$10,000");
console.log(myBankAcc.getBalance());
