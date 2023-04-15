// encapsukation is data hidung or binding
// binding - private variables with their getters and setters
// onlyt way to access them is through getters and setters

class Profile {
  #age;
  #idNum;

  constructor(name, age, gender, id) {
    this.name = name;
    this.#age = age;
    this.#idNum = id;
    this.gender = gender;
  }
  getAge() {
    return this.#age;
  }
  setAge(newage) {
    this.#age = newage;
  }
  getIdNum() {
    return this.#idNum;
  }
  setIdNum(newId) {
    this.#idNum = newId;
  }
}
let kiran = new Profile("Kiran", 23, "Female", 1016059396);
console.log("user", kiran);
console.log("origional data");
console.log(kiran.getAge());
console.log(kiran.getIdNum());

console.log("after setting new age and Id");
kiran.setAge(100);
kiran.setIdNum(123456789)
console.log(kiran.getAge());
console.log(kiran.getIdNum());
