let count = 0;
const container = document.querySelector(".container");
const value = document.querySelector("#value");
const incBtn = document.querySelector(".increase");
const decBtn = document.querySelector(".decrease");
const resetBtn = document.querySelector(".reset");

const add = () => {
  return (value.innerHTML = count++);
};

const subtract = () => {
  return (value.innerHTML = count--);
};
const reset = () => {
  count = 0;
  return (value.innerHTML = count);
};

incBtn.addEventListener("click", add);
decBtn.addEventListener("click", subtract);
resetBtn.addEventListener("click", reset);

add();
subtract();
reset();
