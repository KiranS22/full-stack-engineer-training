let prices = [60, 70, 55, 80, 50];
let tracker = 0;
let fees = 0;
const calculateCost = () => {
  document.querySelector("#price").innerHTML = `£ ${tracker + fees}`;
};
const removeItems = () => {};

const updateTotal = () => {
  let allInputs = document.querySelectorAll(".total-value span");
  let newInput = [];
  for (let i = 0; i < allInputs.length; i++) {
    const element = allInputs[i];
    newInput.push(parseInt(element.textContent));
  }
  let init = 0;
  let total = newInput.reduce((cur, acc) => cur + acc, init);
  tracker = total;
  document.querySelector(".total").innerHTML = `£ ${total}`;
  calculateCost();
};
const toggleTotal = (num, elem, val) => {
  let result = num * val;
  elem.textContent = ` ${result}`;
  updateTotal();
};

const element = (e) => document.querySelector(e);
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c9e7d26dedmsh1f84993cca5981bp16ac2cjsn176bdec69c91",
    "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
  },
};

fetch(
  "https://rawg-video-games-database.p.rapidapi.com/games?key=66251d95a8da498f9aba3e6b056e8fa1",
  options
)
  .then((response) => response.json())
  .then((response) => handleResponse(response.results))
  .catch((err) => console.error(err));

const handleResponse = (response) => {
  for (let i = 0; i < 4; i++) {
    const obj = response[i];
    let count = 1;
    let newProduct = document.createElement("div");
    newProduct.classList.add("product", "grid");
    newProduct.innerHTML = `
		<!-- First column -->

		<div class="productDetails flex">
			<img
				id="first-img"
				src="${obj.background_image}"
				alt=""
			/>
			<div class="info">
				<h4>${obj.name}</h4>
				<span>Remove</span>
			</div>
		</div>
		<!-- Second Column -->
		<div class="quantity-container flex">
			<span class="decrease">–</span>
			<input type="number" value="1" id="input" />
			<span class="increase">+</span>
		</div>
		<!-- Third Column -->
		<div class="price-container">
			<div class="value">
				<span>£${prices[i]}</span>
			</div>
		</div>
		<!-- Forth Column -->
		<div class="total-container">
			<div class="total-value">
				£ <span>${prices[i]}</span>
			</div>
		</div>`;
    element(".grid-container").appendChild(newProduct);
    let decrease = newProduct.querySelector(".decrease");
    let input = newProduct.querySelector("#input");
    let increase = newProduct.querySelector(".increase");
    let priceSpan = newProduct.querySelector(".total-value span");
    decrease.addEventListener("click", () => {
      if (count === 1) {
        return false;
      }
      count--;
      input.value = count;
      toggleTotal(prices[i], priceSpan, count);
    });
    increase.addEventListener("click", () => {
      count++;
      input.value = count;
      toggleTotal(prices[i], priceSpan, count);
    });
  }
  updateTotal();
};
let select = document.querySelector("select");
const start = () => {
  let val = select.options[select.selectedIndex];
  console.log(val);
  fees = parseFloat(val.value);
  calculateCost();
};
select.addEventListener("change", () => {
  start();
});
start();
