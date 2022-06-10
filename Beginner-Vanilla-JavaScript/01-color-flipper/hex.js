const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const button = document.querySelector(".btn");
const container = document.querySelector("body");
const spanTxt = document.querySelector(".color");

let setBg = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  container.style.backgroundColor = "#" + randomColor;
  spanTxt.innerHTML = "#" + randomColor;
}

button.addEventListener('click', setBg);
setBg()



