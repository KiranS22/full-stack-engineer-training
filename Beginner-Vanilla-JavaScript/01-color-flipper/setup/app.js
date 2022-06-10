const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const button = document.querySelector(".btn");
const container = document.querySelector("body");
const spanTxt = document.querySelector(".color");
button.addEventListener("click", () => {
  for (let i = 0; i < colors.length; i++) {
    let randomColor = Math.floor(Math.random() * colors.length);
    const bgColor = colors[randomColor];

    container.style.backgroundColor = bgColor;
    spanTxt.innerHTML = bgColor;
  }
});
